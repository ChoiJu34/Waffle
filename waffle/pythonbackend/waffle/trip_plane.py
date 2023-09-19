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
import datetime

# 로깅 설정
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

result = []

@api_view(['POST'])
def tripPlane(request):
    logger.debug(f"start")
    data = json.loads(request.body)

    memberCnt = data["memberCnt"]

    # 항공권 크롤링(계획별)
    with Pool(processes=5) as pool:
        result.append(pool.starmap(multi_threading, [(plan, memberCnt) for plan in data["planPlane"]]))

    response_data = {
        'plane': result,
    }

    json_response = json.dumps(response_data, ensure_ascii=False).encode('utf-8')
    return HttpResponse(json_response, content_type="application/json;charset=utf-8")


planes=[]
cards=[]
def multi_threading(planPlane, memberCnt):
    placeStart = planPlane["placeStart"]
    placeEnd = planPlane["placeEnd"]
    startStart = planPlane["startStart"].split()[0].replace("-", "")
    startEnd = planPlane["startEnd"].split()[0].replace("-", "")

    day = int(startEnd) - int(startStart) + 1

    threads = []
    for n in range(day):
        thread = threading.Thread(target=crawling_multi_thread, args=((n, memberCnt, placeStart, placeEnd, startStart, planPlane, day),))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    plane_card = {
        "plane": planes,
        "card": cards
    }
    return plane_card


def crawling_multi_thread(info):
    n, memberCnt, placeStart, placeEnd, startStart, planPlane, day = info
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    driver = webdriver.Chrome()

    url = f'https://kr.trip.com/flights/{placeStart}-to-{placeEnd}/tickets-{placeStart}-{placeEnd}?dcity={placeStart}&acity={placeEnd}&ddate={int(startStart) + int(n)}&rdate=&flighttype=ow&class=y&lowpricesource=searchform&quantity={memberCnt}&searchboxarg=t&locale=ko-KR&curr=KRW'
    xpath1 = '//*[@id="main"]/div[2]/div[7]/div[1]/div[2]/div[4]/div[1]/div[1]/div/div[2]'# 낮은가격순 버튼
    xpath2 = '//*[@id="J_resultList"]/div/div/div[1]/div[2]'

    driver.get(url)

    time.sleep(0.7)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.element_to_be_clickable((By.XPATH, xpath1)))
    driver.find_element(By.XPATH, xpath1).click()

    start = datetime.datetime.now()
    end = start + datetime.timedelta(seconds=0.5)
    while True:
        driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
        time.sleep(0.5)
        if datetime.datetime.now() > end:
            break

    time.sleep(0.8)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath2)))
    elements = driver.find_elements(By.XPATH, xpath2)

    # n일째의 i번째 비행기
    plane = []
    for element in elements:
        pattern = r'항공사|선택|원|,|저비용|공동운항편|\s\+\d+\n'
        origin = re.sub(pattern, "", element.get_attribute('innerText'))
        origin = re.sub(r'\n\n', '\n', origin)
        origin = re.sub(r'\s\n', '', origin).split('\n')
        plane.append(origin)
    planes.append(plane)
    driver.quit()