from multiprocessing import Pool, Manager
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
import datetime
import copy
import multiprocessing
multiprocessing.set_start_method('spawn')
from multiprocessing import Pool, get_context

# 로깅 설정
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# 로그 기록 예시
logger.debug(f"스레드 {threading.current_thread().name}: 데이터 스크랩 중...")

result = []
q_list = []

manager = get_context('spawn').Manager()
multi_list = manager.list()
@api_view(['POST'])
def plane(request):
    logger.debug(f"start")
    data = json.loads(request.body)

    memberCnt = data["memberCnt"]

    multi_list[:] = [manager.Queue() for _ in data["planPlane"]]

    threads = []
    for k, plan in enumerate(data["planPlane"]):
        thread = threading.Thread(target=multi_threading, args=((k, plan, memberCnt),))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    # 항공권 크롤링(계획별)
    # with Pool(processes=5) as pool:
    #     logger.debug(data["planPlane"])
    #     result.append(pool.starmap(multi_threading, [(k, plan, memberCnt) for k, plan in enumerate(data["planPlane"])]))

    for k in range(len(data["planPlane"])):
        top = multi_list[k].get()
        best = [top.date, top.name, top.startPlace, top.startTime, top.endPlace, top.endTime, top.card, top.originPrice, top.discountPrice, top.layover, top.long, top.site]
        result.append(best)

    json_response = json.dumps(result, ensure_ascii=False).encode('utf-8')
    return HttpResponse(json_response, content_type="application/json;charset=utf-8")

def multi_threading(info):
    k, planPlane, memberCnt = info

    placeStart = planPlane["placeStart"]
    placeEnd = planPlane["placeEnd"]
    startStart = planPlane["startStart"].split()[0].replace("-", "")
    startEnd = planPlane["startEnd"].split()[0].replace("-", "")

    day = int(startEnd) - int(startStart) + 1

    threads = []
    for n in range(day):
        for i in range(2):
            thread = threading.Thread(target=crawling_multi_thread, args=((i, k, n, memberCnt, placeStart, placeEnd, startStart, planPlane, day),))
            threads.append(thread)
            thread.start()

    for thread in threads:
        thread.join()

def crawling_multi_thread(info):
    i, k, n, memberCnt, placeStart, placeEnd, startStart, planPlane, day = info

    if i==0:
        interpark_crawling(info)
    # elif i==1:
    #     trip_crawling(info)


def interpark_crawling(info):
    i, k, n, memberCnt, placeStart, placeEnd, startStart, planPlane, day = info
    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    driver = webdriver.Chrome()

    today = int(startStart) + int(n)

    url = f'https://fly.interpark.com/booking/mainFlights.do?tripType=OW&sdate0={int(startStart) + int(n)}&sdate1=&dep0={placeStart}&arr0={placeEnd}&dep1=&arr1=&adt={memberCnt}&chd=0&inf=0&val=&comp=Y&via=#list'
    xpath = '//ul[@id="schedule0List"]/li'

    driver.get(url)
    time.sleep(0.17)
    wait = WebDriverWait(driver, 120)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath)))
    elements = driver.find_elements(By.XPATH, xpath)

    # n일째의 i번째 비행기
    q = multi_list[k]
    for element in elements:
        pattern = r'공동운항.*?입니다.|Best'
        origin = re.sub(pattern, "", element.get_attribute('textContent')).split('팝업닫기')
        planeTime = origin[0].replace(" 경유", "경유").split()[2].split(":")
        userTimeS = planPlane["startStart"].split()[1].split(":")
        userTimeE = planPlane["startEnd"].split()[1].split(":")
        p = re.sub("(,|원~|\+1)", "", origin[0]).replace(" 경유", "경유").replace('시간 ','시간').split()

        cards = re.sub("( |~|원|,|요금선택|조건)", "", origin[1]).replace('(', '').replace(')', ' ').split("성인")
        del cards[0]
        origin = cards[len(cards)-1]
        del cards[len(cards)-1]
        if len(cards)==0:
            q.put(Plane(today, p[0], p[1], p[2], p[3], p[4], card_info[0], origin, discount, p[5], p[6], '인터파크'))

        pt = int(planeTime[0])
        uts = int(userTimeS[0])
        ute = int(userTimeE[0])
        pt1 = int(planeTime[1])
        uts1 = int(userTimeS[1])
        ute1 = int(userTimeE[1])
        for card in cards:
            card_info = card.split(' ')
            discount = int(card_info[1].split('장애인')[0])
            logger.debug(f'{card_info}, {discount}')
            if n == 0:
                if pt > uts:  # 비행기H>설정H
                    q.put(Plane(today, p[0], p[1], p[2], p[3], p[4], card_info[0], origin, discount, p[5], p[6], '인터파크'))
                elif pt == uts and pt1 >= uts1:
                    q.put(Plane(today, p[0], p[1], p[2], p[3], p[4], card_info[0], origin, discount, p[5], p[6], '인터파크'))
            elif n == (day - 1):
                if pt < ute:
                    q.put(Plane(today, p[0], p[1], p[2], p[3], p[4], card_info[0], origin, discount, p[5], p[6], '인터파크'))
                elif pt == ute and pt1 <= ute1:
                    q.put(Plane(today, p[0], p[1], p[2], p[3], p[4], card_info[0], origin, discount, p[5], p[6], '인터파크'))
            else:
                q.put(Plane(today, p[0], p[1], p[2], p[3], p[4], card_info[0], origin, discount, p[5], p[6], '인터파크'))
    multi_list[k] = q
    driver.quit()

def trip_crawling(info):
    i, k, n, memberCnt, placeStart, placeEnd, startStart, planPlane, day = info
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
    q = multi_list[k]
    for element in elements:
        pattern = r'항공사|선택|원|,|저비용|공동운항편|\s\+\d+\n'
        origin = re.sub(pattern, "", element.get_attribute('innerText'))
        origin = re.sub(r'\n\n', '\n', origin)
        p = re.sub(r'\s\n', '', origin).split('\n')
        planeTime = p[1].split(":")
        userTimeS = planPlane["startStart"].split()[1].split(":")
        userTimeE = planPlane["startEnd"].split()[1].split(":")
        logger.debug(f'{planeTime}, ?????????, {p[1]}, {p}')
        pt = int(planeTime[0])
        uts = int(userTimeS[0])
        ute = int(userTimeE[0])
        pt1 = int(planeTime[1])
        uts1 = int(userTimeS[1])
        ute1 = int(userTimeE[1])
        if n == 0:
            if pt > uts:  # 비행기H>설정H
                q.put(Plane(p[0], p[2], p[1], p[6], p[5], p[7], p[4], p[3], '트립닷컴'))
            elif pt == uts and pt1 >= uts1:
                q.put(Plane(p[0], p[2], p[1], p[6], p[5], p[7], p[4], p[3], '트립닷컴'))
        elif n == (day - 1):
            if pt < ute:
                q.put(Plane(p[0], p[2], p[1], p[6], p[5], p[7], p[4], p[3], '트립닷컴'))
            elif pt == ute and pt1 <= ute1:
                q.put(Plane(p[0], p[2], p[1], p[6], p[5], p[7], p[4], p[3], '트립닷컴'))
        else:
            q.put(Plane(p[0], p[2], p[1], p[6], p[5], p[7], p[4], p[3], '트립닷컴'))
    multi_list[k] = q
    driver.quit()