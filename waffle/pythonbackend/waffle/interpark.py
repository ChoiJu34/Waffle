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
            result = []
            for planHotel in data["planHotel"]:
                where = planHotel["where"]
                start = planHotel["start"]
                end = planHotel["end"]

                # Constructing the URL
                url = f'https://travel.interpark.com/hotel/search?q={where}&checkin={start}&checkout={end}&searchType=keyword&occupancies={memberCnt}&typeKey='
                xpath1 = '//ul[@class="tourCompSearchList"]/li/a'
                xpath2 = '//ul[@class="tourCompSearchList"]/li/a/div/img'

                driver.get(url)
                wait = WebDriverWait(driver, 120)
                wait.until(EC.presence_of_element_located((By.XPATH, xpath1)))
                wait = WebDriverWait(driver, 120)
                wait.until(EC.presence_of_element_located((By.XPATH, xpath2)))

                elements1 = driver.find_elements(By.XPATH, xpath1)
                elements2 = driver.find_elements(By.XPATH, xpath2)
                for element1, element2 in zip(elements1, elements2):
                    # 추출한 데이터를 딕셔너리로 추가
                    pattern = r'성급.*?판매가|원~정상가'
                    origin = re.sub(pattern, " ", element1.get_attribute('textContent'))
                    result.append(re.sub(r',|청구할인|추천|항공할인', "", origin).split("원")[0].split(" "))
                    result.append(element1.get_attribute('href'))
                    result.append(element2.get_attribute('src'))

            response_data = {
                'data': result,
            }

            # 이제 JSON으로 직렬화할 수 있습니다.
            json_response = json.dumps(response_data, ensure_ascii=False).encode('utf-8')

            return HttpResponse(json_response, content_type="application/json;charset=utf-8")
        finally:
            driver.quit()

