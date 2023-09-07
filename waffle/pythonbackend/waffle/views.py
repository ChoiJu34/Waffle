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

        url = 'https://fly.interpark.com/booking/mainFlights.do?tripType=OW&sdate0=20240221&sdate1=&dep0=PUS&arr0=NRT&dep1=&arr1=&adt=1&chd=0&inf=0&val=&comp=Y&via=#list'
        xpath = '//ul[@id="schedule0List"]/li'

        options = Options()
        options.add_argument("--headless")  # 헤드리스 모드로 실행
        options.add_argument("--disable-gpu")  # GPU 사용 안 함 (헤드리스 모드에서 필요)

        # Chrome WebDriver 실행 파일의 경로를 지정
        driver = webdriver.Chrome()
        try:
            driver.get(url)
            wait=WebDriverWait(driver, 10)
            wait.until(EC.presence_of_element_located((By.XPATH, xpath)))

            elements = driver.find_elements(By.XPATH, xpath)
            # data = [element.get_attribute('textContent') for element in elements]
            data = []
            cards = []
            card = []
            for element in elements:
                origin = element.get_attribute('textContent').split('팝업닫기')
                data.append(origin[0].split())
                cards.append(re.sub("( |~|원|,|요금선택|조건)","", origin[1]).replace('(', '').replace(')',' ').split("성인"))

            response_data = {
                'result': 'accept success',
                'data' : data,
                'card':cards
            }

            # Spring Boot로 응답
            json_response = json.dumps(response_data, ensure_ascii=False).encode('utf-8')
            return HttpResponse(json_response, content_type="application/json;charset=utf-8")

        finally:
            driver.quit()

