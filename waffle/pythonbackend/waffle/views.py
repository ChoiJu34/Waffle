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

# 로그 기록 예시
logger.debug(f"스레드 {threading.current_thread().name}: 데이터 스크랩 중...")

result = []

@api_view(['POST'])
def interparkPlane(request):
    logger.debug(f"start")
    data = json.loads(request.body)

    memberCnt = data["memberCnt"]

    # 항공권 크롤링(계획별)
    with Pool(processes=5) as pool:
        result.append(pool.starmap(multi_threading, [(plan, memberCnt) for plan in data["planPlane"]]))

    response_data = {
        'plane': result,
    }
    logger.debug(f"~!!!!!! : {response_data}")

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

    url = f'https://fly.interpark.com/booking/mainFlights.do?tripType=OW&sdate0={int(startStart) + int(n)}&sdate1=&dep0={placeStart}&arr0={placeEnd}&dep1=&arr1=&adt={memberCnt}&chd=0&inf=0&val=&comp=Y&via=#list'
    xpath = '//ul[@id="schedule0List"]/li'

    driver.get(url)
    time.sleep(0.17)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath)))
    elements = driver.find_elements(By.XPATH, xpath)

    # n일째의 i번째 비행기
    plane = []
    card = []
    for element in elements:
        pattern = r'공동운항.*?입니다.|Best'
        origin = re.sub(pattern, "", element.get_attribute('textContent')).split('팝업닫기')
        planeTime = origin[0].replace(" 경유", "경유").split()[2].split(":")
        userTimeS = planPlane["startStart"].split()[1].split(":")
        userTimeE = planPlane["startEnd"].split()[1].split(":")
        pt = int(planeTime[0])
        uts = int(userTimeS[0])
        ute = int(userTimeE[0])
        pt1 = int(planeTime[1])
        uts1 = int(userTimeS[1])
        ute1 = int(userTimeE[1])
        if n == 0:
            if pt > uts:  # 비행기H>설정H
                plane.append(origin[0].replace(" 경유", "경유").split())
                card = re.sub("( |~|원|,|요금선택|조건)", "", origin[1]).replace('(', '').replace(')', ' ').split("성인")
            elif pt == uts and pt1 >= uts1:
                plane.append(origin[0].replace(" 경유", "경유").split())
                card.append(re.sub("( |~|원|,|요금선택|조건)", "", origin[1]).replace('(', '').replace(')', ' ').split("성인"))
        elif n == (day - 1):
            if pt < ute:
                plane.append(origin[0].replace(" 경유", "경유").split())
                card.append(re.sub("( |~|원|,|요금선택|조건)", "", origin[1]).replace('(', '').replace(')', ' ').split("성인"))
            elif pt == ute and pt1 <= ute1:
                plane.append(origin[0].replace(" 경유", "경유").split())
                card.append(re.sub("( |~|원|,|요금선택|조건)", "", origin[1]).replace('(', '').replace(')', ' ').split("성인"))
        else:
            plane.append(origin[0].replace(" 경유", "경유").split())
            card.append(re.sub("( |~|원|,|요금선택|조건)", "", origin[1]).replace('(', '').replace(')', ' ').split("성인"))
    planes.append(plane)
    cards.append(card)
    driver.quit()