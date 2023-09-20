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
from waffle.dto import Plane
import queue

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

    json_response = json.dumps(result, ensure_ascii=False).encode('utf-8')
    return HttpResponse(json_response, content_type="application/json;charset=utf-8")


q = queue.PriorityQueue()
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

    top = q.get()
    best = [top.name, top.startPlace, top.startTime, top.endPlace, top.endTime, top.price, top.layover, top.long]
    return best


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
        p = re.sub("(,|원~|\+1)", "", origin[0]).replace(" 경유", "경유").replace('시간 ','시간').split()
        pt = int(planeTime[0])
        uts = int(userTimeS[0])
        ute = int(userTimeE[0])
        pt1 = int(planeTime[1])
        uts1 = int(userTimeS[1])
        ute1 = int(userTimeE[1])
        if n == 0:
            if pt > uts:  # 비행기H>설정H
                q.put(Plane(p[0], p[1], p[2], p[3], p[4], p[len(p) - 2], p[5], p[6]))
            elif pt == uts and pt1 >= uts1:
                q.put(Plane(p[0], p[1], p[2], p[3], p[4], p[len(p) - 2], p[5], p[6]))
        elif n == (day - 1):
            if pt < ute:
                q.put(Plane(p[0], p[1], p[2], p[3], p[4], p[len(p) - 2], p[5], p[6]))
            elif pt == ute and pt1 <= ute1:
                q.put(Plane(p[0], p[1], p[2], p[3], p[4], p[len(p) - 2], p[5], p[6]))
        else:
            q.put(Plane(p[0], p[1], p[2], p[3], p[4], p[len(p) - 2], p[5], p[6]))
    driver.quit()
