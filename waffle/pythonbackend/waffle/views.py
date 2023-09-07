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
def convert_data(request):
    if request.method == 'POST':
        # Spring Boot로부터 데이터 수신
        data = json.loads(request.body)

        # Extracting data from JSON
        memberCnt = data["memberCnt"]
        planPlane = data["planPlane"][0]  # Assuming you are using the first planPlane entry

        # Extracting relevant fields from planPlane
        placeStart = planPlane["placeStart"]
        placeEnd = planPlane["placeEnd"]
        startStart = planPlane["startStart"].split()[0].replace("-", "")
        startEnd = planPlane["startEnd"].split()[0].replace("-", "")

        day = int(startEnd)-int(startStart) + 1

        options = Options()
        options.add_argument("--headless")  # 헤드리스 모드로 실행
        options.add_argument("--disable-gpu")  # GPU 사용 안 함 (헤드리스 모드에서 필요)

        # Chrome WebDriver 실행 파일의 경로를 지정
        driver = webdriver.Chrome()
        try:
            data = []
            for n in range(day):
                # Constructing the URL
                url = f'https://fly.interpark.com/booking/mainFlights.do?tripType=OW&sdate0={int(startStart)+int(n)}&sdate1=&dep0={placeStart}&arr0={placeEnd}&dep1=&arr1=&adt={memberCnt}&chd=0&inf=0&val=&comp=Y&via=#list'
                xpath = '//ul[@id="schedule0List"]/li'

                driver.get(url)
                wait=WebDriverWait(driver, 10)
                wait.until(EC.presence_of_element_located((By.XPATH, xpath)))

                elements = driver.find_elements(By.XPATH, xpath)
                # data = [element.get_attribute('textContent') for element in elements]
                plane = []
                cards = []
                for element in elements:
                    origin = element.get_attribute('textContent').split('팝업닫기')
                    planeinfo=origin[0].split()
                    if planeinfo[2].split[":"][0]>startStart[1].split[":"][0]: # 비행기시간>설정시간
                        plane.append(origin[0].split())
                        cards.append(re.sub("( |~|원|,|요금선택|조건)","", origin[1]).replace('(', '').replace(')',' ').split("성인"))

                data.append(plane)
                data.append(cards)

            response_data = {
                'result': 'accept success',
                'data': data
            }

            # Spring Boot로 응답
            json_response = json.dumps(response_data, ensure_ascii=False).encode('utf-8')
            return HttpResponse(json_response, content_type="application/json;charset=utf-8")

        finally:
            driver.quit()

