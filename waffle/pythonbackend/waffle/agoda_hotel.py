import datetime
import json
import logging
import time
from multiprocessing import Pool

from django.http import HttpResponse
from rest_framework.decorators import api_view
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait
import re

# 로깅 설정
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

result = []

@api_view(['POST'])
def agodaHotel(request):
    data = json.loads(request.body)

    memberCnt = data["memberCnt"]

    # 항공권 크롤링(계획별)
    with Pool(processes=4) as pool:
        result.append(pool.starmap(multi_threading, [(plan, memberCnt) for plan in data["planHotel"]]))

    response_data = {
        'hotel': result,
    }

    json_response = json.dumps(response_data, ensure_ascii=False).encode('utf-8')
    return HttpResponse(json_response, content_type="application/json;charset=utf-8")



def multi_threading(planHotel, memberCnt):
    where = planHotel["where"]
    start = planHotel["start"]
    end = planHotel["end"]

    url = f'https://www.agoda.com/ko-kr/search?city=1&checkIn={start}&checkOut={end}&rooms=1&adults={memberCnt}&children=0&sort=reviewAll'
    xpath1 = '//*[@id="textInput"]'
    xpath2 = '//*[@id="SearchBoxContainer"]/div/div/button'
    xpath3 = '//*[@id="autocomplete-box"]/div'
    xpath4 = '//*[@id="contentContainer"]/div[4]/ol/li'
    xpath5 = '//*[@id="sort-bar"]/div/a[2]'
    xpath6 = '//*[@id="contentContainer"]/div[3]/ol/li/div/a'
    xpath7 = '//*[@id="contentContainer"]/div[3]/ol/li/div/a/div/div[1]/div/div[3]/img'

    driver = webdriver.Chrome()
    driver.get(url)
    time.sleep(0.2)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.element_to_be_clickable((By.XPATH, xpath3)))
    driver.find_element(By.XPATH, xpath3).click()
    time.sleep(0.3)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath1)))
    driver.find_element(By.XPATH, xpath1).clear()
    time.sleep(0.3)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath1)))
    driver.find_element(By.XPATH, xpath1).send_keys(where)
    time.sleep(0.6)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.element_to_be_clickable((By.XPATH, xpath2)))
    driver.find_element(By.XPATH, xpath2).click()

    time.sleep(0.4)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.element_to_be_clickable((By.XPATH, xpath5)))
    driver.find_element(By.XPATH, xpath5).click()

    time.sleep(0.2)
    before_location = driver.execute_script("return window.pageYOffset")
    while True:
        driver.execute_script("window.scrollTo(0,{})".format(before_location + 900))
        time.sleep(0.02)
        after_location = driver.execute_script("return window.pageYOffset")
        if before_location == after_location:
            break
        else:
            before_location = driver.execute_script("return window.pageYOffset")

    time.sleep(0.4)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath4)))
    elements = driver.find_elements(By.XPATH, xpath4)

    for element in elements:
        href_element = element.find_element(By.XPATH, xpath6)
        src_element = element.find_element(By.XPATH, xpath7)
        origin = re.sub(r'\n예약 무료 취소|,|₩\s|페이지.*?\n', '', element.get_attribute('innerText'))
        try:
            origin.split('모두 보기\n')[1]
        except Exception:
            continue
        origin = origin.split('모두 보기\n')[1].split('\n')
        if origin[len(origin)-1]=='본 사이트 객실 판매 완료':
            continue
        origin = [origin[0], origin[len(origin)-1], href_element.get_attribute('href'), src_element.get_attribute('src')]
        result.append(origin)
    return result
    driver.quit()
