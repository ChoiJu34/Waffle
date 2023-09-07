from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@csrf_exempt
def convert_data(request):
    if request.method == 'POST':
        # Spring Boot로부터 데이터 수신
        data = json.loads(request.body)

        url = 'https://fly.interpark.com/booking/mainFlights.do?tripType=OW&sdate0=20240221&sdate1=&dep0=PUS&arr0=NRT&dep1=&arr1=&adt=1&chd=0&inf=0&val=&comp=Y&via=#list'
        xpath = '//ul[@id="schedule0List"]'

        options = Options()
        options.add_argument("--headless")  # 헤드리스 모드로 실행
        options.add_argument("--disable-gpu")  # GPU 사용 안 함 (헤드리스 모드에서 필요)

        # Chrome WebDriver 실행 파일의 경로를 지정
        driver = webdriver.Chrome()
        try:
            driver.get(url)

            elements = driver.find_elements(By.XPATH, '//ul[@id="schedule0List"]/li')
            # data = [element.get_attribute('textContent') for element in elements]
            data = []
            for element in elements:
                origin = element.get_attribute('textContent').split()
                data.append(origin)

            response_data = {
                'result': 'accept success',
                'data' : data
            }

            # Spring Boot로 응답
            json_response = json.dumps(response_data, ensure_ascii=False).encode('utf-8')
            return HttpResponse(json_response, content_type="application/json;charset=utf-8")

        finally:
            driver.quit()

