from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re

@csrf_exempt
def interparkPlane(request):
    if request.method == 'POST':
        # Spring Boot로부터 데이터 수신
        data = json.loads(request.body)
        # Extracting data from JSON
        memberCnt = data["memberCnt"]
        options = Options()
        options.add_argument("--headless")  # 헤드리스 모드로 실행
        options.add_argument("--disable-gpu")  # GPU 사용 안 함 (헤드리스 모드에서 필요)
        # Chrome WebDriver 실행 파일의 경로를 지정
        driver = webdriver.Chrome()
        try:
            result=[]
            for planPlane in data["planPlane"]:
                placeStart = planPlane["placeStart"]
                placeEnd = planPlane["placeEnd"]
                startStart = planPlane["startStart"].split()[0].replace("-", "")
                startEnd = planPlane["startEnd"].split()[0].replace("-", "")

                day = int(startEnd)-int(startStart) + 1
                planes = []
                cards = []
                for n in range(day):
                    # Constructing the URL
                    url = f'https://fly.interpark.com/booking/mainFlights.do?tripType=OW&sdate0={int(startStart)+int(n)}&sdate1=&dep0={placeStart}&arr0={placeEnd}&dep1=&arr1=&adt={memberCnt}&chd=0&inf=0&val=&comp=Y&via=#list'
                    xpath = '//ul[@id="schedule0List"]/li'

                    driver.get(url)
                    wait=WebDriverWait(driver, 120)
                    wait.until(EC.presence_of_element_located((By.XPATH, xpath)))

                    elements = driver.find_elements(By.XPATH, xpath)

                    plane = []
                    card = []
                    for element in elements:
                        pattern=r'공동운항.*?입니다.|Best'
                        origin = re.sub(pattern,"",element.get_attribute('textContent')).split('팝업닫기')
                        planeTime=origin[0].replace(" 경유", "경유").split()[2].split(":")
                        userTimeS=planPlane["startStart"].split()[1].split(":")
                        userTimeE=planPlane["startEnd"].split()[1].split(":")
                        pt = int(planeTime[0])
                        uts = int(userTimeS[0])
                        ute = int(userTimeE[0])
                        pt1 = int(planeTime[1])
                        uts1 = int(userTimeS[1])
                        ute1 = int(userTimeE[1])
                        if n==0:
                            if pt>uts: # 비행기H>설정H
                                plane.append(origin[0].replace(" 경유", "경유").split())
                                card.append(re.sub("( |~|원|,|요금선택|조건)","", origin[1]).replace('(', '').replace(')',' ').split("성인"))
                            elif pt==uts and pt1>=uts1:
                                plane.append(origin[0].replace(" 경유", "경유").split())
                                card.append(re.sub("( |~|원|,|요금선택|조건)","", origin[1]).replace('(', '').replace(')',' ').split("성인"))
                        elif n==(day-1):
                            if pt<ute:
                                plane.append(origin[0].replace(" 경유", "경유").split())
                                card.append(re.sub("( |~|원|,|요금선택|조건)","", origin[1]).replace('(', '').replace(')',' ').split("성인"))
                            elif pt==ute and pt1<=ute1:
                                plane.append(origin[0].replace(" 경유", "경유").split())
                                card.append(re.sub("( |~|원|,|요금선택|조건)","", origin[1]).replace('(', '').replace(')',' ').split("성인"))
                        else:
                            plane.append(origin[0].replace(" 경유", "경유").split())
                            card.append(re.sub("( |~|원|,|요금선택|조건)","", origin[1]).replace('(', '').replace(')',' ').split("성인"))

                    planes.append(plane)
                    cards.append(card)

                plane_card = {
                    "plane" : planes,
                    "card" : cards
                }
                result.append(plane_card)

            response_data = {
                'data' : result,
            }

            # Spring Boot로 응답
            json_response = json.dumps(response_data, ensure_ascii=False).encode('utf-8')
            return HttpResponse(json_response, content_type="application/json;charset=utf-8")

        finally:
            driver.quit()


@csrf_exempt
def interparkHotel(request):
    if request.method == 'POST':
        # Spring Boot로부터 데이터 수신
        data = json.loads(request.body)
        # Extracting data from JSON
        memberCnt = data["memberCnt"]
        options = Options()
        options.add_argument("--headless")  # 헤드리스 모드로 실행
        options.add_argument("--disable-gpu")  # GPU 사용 안 함 (헤드리스 모드에서 필요)
        # Chrome WebDriver 실행 파일의 경로를 지정
        driver = webdriver.Chrome()
        try:
            for planHotel in data["planHotel"]:
                where = planHotel["where"]
                start = planHotel["start"]
                end = planHotel["end"]
                # Constructing the URL
                url = f'https://travel.interpark.com/hotel/search?q={where}&checkin={start}&checkout={end}&searchType=keyword&occupancies={memberCnt}&typeKey='
                xpath = '//ul[@class="tourComSearchList"]/li'

                driver.get(url)
                wait = WebDriverWait(driver, 120)
                wait.until(EC.presence_of_element_located((By.XPATH, xpath)))

                elements = driver.find_elements(By.XPATH, xpath)

                response_data = {
                    'data' : elements,
                }
            json_response = json.dumps(response_data, ensure_ascii=False).encode('utf-8')
            return HttpResponse(json_response, content_type="application/json;charset=utf-8")
        finally:
            driver.quit()