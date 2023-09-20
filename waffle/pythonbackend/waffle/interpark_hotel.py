from multiprocessing import Pool
import json
from django.http import HttpResponse
from rest_framework.decorators import api_view
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time
import threading
import logging

# 로깅 설정
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

result = []

@api_view(['POST'])
def interparkHotel(request):
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

    url = f'https://travel.interpark.com/hotel/search?q={where}&checkin={start}&checkout={end}&searchType=keyword&occupancies={memberCnt}&typeKey='
    xpath1 = '//ul[@class="tourCompSearchList"]/li/a'
    xpath2 = '//ul[@class="tourCompSearchList"]/li/a/div/img'
    xpath3 = '//*[@id="__next"]/div/main/div[2]/div[2]/div[2]/div[2]/button'
    xpath4 = '//*[@id="__next"]/div/main/div[2]/div[2]/div[2]/div[2]/div/button[4]'
    xpath5 = '//*[@id="__next"]/div/main/div[2]/div[2]/div[4]/button'

    driver = webdriver.Chrome()
    driver.get(url)
    time.sleep(0.1)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath3)))
    driver.find_element(By.XPATH, xpath3).click()

    wait = WebDriverWait(driver, 120)
    time.sleep(0.1)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath4)))
    driver.find_element(By.XPATH, xpath4).click()

    for i in range(5):
        time.sleep(0.2)
        wait = WebDriverWait(driver, 120)
        wait.until(EC.element_to_be_clickable((By.XPATH, xpath5)))
        driver.find_element(By.XPATH, xpath5).click()

    time.sleep(0.7)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath1)))
    elements1 = driver.find_elements(By.XPATH, xpath1)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath1)))
    elements2 = driver.find_elements(By.XPATH, xpath2)

    for element1, element2 in zip(elements1, elements2):
        # 추출한 데이터를 딕셔너리로 추가
        origin = re.sub(r'\+', "", element1.get_attribute('textContent'))
        pattern = r'청구할인|추천|항공할인|05267.*?가|원~정상가|(\d+)성급.*?가|~로그인.*?확인|(\d+)(\d+)(\d+)(\d+)(\d+)판매가'
        origin = re.sub(pattern, " ", origin)
        origin = re.sub(r' +', " ", origin)
        degree = re.compile('\(([^)]+)').findall(origin)
        if (float(degree[len(degree) - 1]) >= 8.0 or float(degree[len(degree) - 1]) == 0) and "객실마감" not in origin:
            hotel = re.sub(r',|청구할인|추천|항공할인', "", origin).split("원")[0].split(" ")
            hotel.append(element1.get_attribute('href'))
            hotel.append(element2.get_attribute('src'))
            result.append(hotel)
    return result
    driver.quit()