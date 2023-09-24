import copy
import logging
import queue
import re
import threading
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

from waffle.dto import Hotel

# 로깅 설정
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

result = []
q_list = []

# multi_list = manager.list()
multi_list = []

def hotel(data):

    memberCnt = data["memberCnt"]

    multi_list[:] = [queue.PriorityQueue() for _ in data["planHotel"]]

    threads = []
    for k, plan in enumerate(data["planHotel"]):
        thread = threading.Thread(target=multi_threading, args=((k, plan, memberCnt),))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    # 항공권 크롤링(계획별)
    # with Pool(processes=5) as pool:
    #     result.append(pool.starmap(multi_threading, [(k, plan, memberCnt) for k, plan in enumerate(data["planPlane"])]))

    # for k in range(len(data["planHotel"])):
    #     top = multi_list[k].get()
    #     best = {
    #         "hotelName" : top.name,
    #         "start" : top.start,
    #         "end" : top.end,
    #         "card" : top.card,
    #         "originPrice" : top.originPrice,
    #         "discountPrice" : top.discountPrice,
    #         "url" : top.url,
    #         "img" : top.img,
    #         "site" : top.site
    #     }
    #     result.append(best)

    return multi_list

def multi_threading(info):
    k, planHotel, memberCnt = info
    where = planHotel["where"]
    start = planHotel["start"]
    end = planHotel["end"]

    threads = []
    for i in range(2):
        thread = threading.Thread(target=crawling_multi_thread, args=((i, k, memberCnt, where, start, end),))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()


def crawling_multi_thread(info):
    i, k, memberCnt, where, start, end = info
    if i == 0:
        interpark_crawling(info)
    elif i == 1:
        agoda_crawling(info)


def interpark_crawling(info):
    i, k, memberCnt, where, start, end = info

    url = f'https://travel.interpark.com/hotel/search?q={where}&checkin={start}&checkout={end}&searchType=keyword&occupancies={memberCnt}&typeKey='
    xpath1 = '//ul[@class="tourCompSearchList"]/li/a'
    xpath2 = '//ul[@class="tourCompSearchList"]/li/a/div/img'
    xpath3 = '//*[@id="__next"]/div/main/div[2]/div[2]/div[2]/div[2]/button'
    xpath4 = '//*[@id="__next"]/div/main/div[2]/div[2]/div[2]/div[2]/div/button[2]'
    xpath5 = '//*[@id="__next"]/div/main/div[2]/div[2]/div[4]/button'

    driver = webdriver.Chrome()
    driver.get(url)
    # time.sleep(0.2)
    wait = WebDriverWait(driver, 20)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath3)))
    driver.find_element(By.XPATH, xpath3).click()

    wait = WebDriverWait(driver, 20)
    # time.sleep(0.2)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath4)))
    driver.find_element(By.XPATH, xpath4).click()

    for i in range(5):
        time.sleep(0.2)
        wait = WebDriverWait(driver, 20)
        wait.until(EC.element_to_be_clickable((By.XPATH, xpath5)))
        driver.find_element(By.XPATH, xpath5).click()

    # time.sleep(0.7)
    wait = WebDriverWait(driver, 20)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath1)))
    elements1 = driver.find_elements(By.XPATH, xpath1)
    # wait = WebDriverWait(driver, 20)
    # wait.until(EC.presence_of_element_located((By.XPATH, xpath2)))
    # elements2 = driver.find_elements(By.XPATH, xpath2)

    # for element1, element2 in zip(elements1, elements2):
    for element1 in elements1:
        element2 = element1.find_element(By.XPATH, xpath2)
        # 추출한 데이터를 딕셔너리로 추가
        origin = re.sub(r'\+', "", element1.get_attribute('textContent'))
        pattern = r'청구할인|추천|항공할인|05267.*?가|원~정상가|(\d+)성급.*?가|~로그인.*?확인|(\d+)(\d+)(\d+)(\d+)(\d+)판매가|%할인판매가'
        origin = re.sub(pattern, " ", origin)
        origin = re.sub(r' +', " ", origin)
        if "객실마감" not in origin:
            hotel = re.sub(r',|청구할인|추천|항공할인', "", origin).split("원")[0].split(" ")
            price = int(hotel[len(hotel) - 1])
            del hotel[len(hotel) - 1]
            if hotel[len(hotel) - 1].isdigit():
                price = int(hotel[len(hotel) - 1])
                del hotel[len(hotel) - 1]
            hotel_name = ''
            for h in hotel:
                hotel_name += h
            multi_list[k].put(Hotel(hotel_name, start, end, '', price, price, element1.get_attribute('href'),
                        element2.get_attribute('src'), '인터파크'))
    driver.quit()


def agoda_crawling(info):
    i, k, memberCnt, where, start, end = info
    url = f'https://www.agoda.com/ko-kr/search?city=1&checkIn={start}&checkOut={end}&rooms=1&adults={memberCnt}&children=0&sort=reviewAll'
    xpath1 = '//*[@id="textInput"]'
    xpath2 = '//*[@id="SearchBoxContainer"]/div/div/button'
    xpath3 = '//*[@id="autocomplete-box"]/div'
    xpath4 = '//*[@id="contentContainer"]/div[4]/ol/li'
    xpath5 = '//*[@id="sort-bar"]/div/a[2]'
    xpath6 = '//*[@id="contentContainer"]/div[3]/ol/li/div/a'
    xpath7 = '//*[@id="contentContainer"]/div[3]/ol/li/div/a/div/div[1]/div/div[3]/img'

    driver = webdriver.Chrome()
    driver.get(url)
    time.sleep(0.5)
    wait = WebDriverWait(driver, 20)
    wait.until(EC.element_to_be_clickable((By.XPATH, xpath3)))
    driver.find_element(By.XPATH, xpath3).click()
    time.sleep(0.5)
    wait = WebDriverWait(driver, 20)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath1)))
    driver.find_element(By.XPATH, xpath1).clear()
    time.sleep(0.5)
    wait = WebDriverWait(driver, 20)
    wait.until(EC.presence_of_element_located((By.XPATH, xpath1)))
    driver.find_element(By.XPATH, xpath1).send_keys(where)
    time.sleep(0.6)
    wait = WebDriverWait(driver, 20)
    wait.until(EC.element_to_be_clickable((By.XPATH, xpath2)))
    driver.find_element(By.XPATH, xpath2).click()

    time.sleep(0.6)
    wait = WebDriverWait(driver, 20)
    wait.until(EC.element_to_be_clickable((By.XPATH, xpath5)))
    driver.find_element(By.XPATH, xpath5).click()

    time.sleep(0.6)
    before_location = driver.execute_script("return window.pageYOffset")
    while True:
        driver.execute_script("window.scrollTo(0,{})".format(before_location + 900))
        time.sleep(0.07)
        after_location = driver.execute_script("return window.pageYOffset")
        if before_location == after_location:
            break
        else:
            before_location = driver.execute_script("return window.pageYOffset")

    time.sleep(0.7)
    try:
        wait = WebDriverWait(driver, 20)
        wait.until(EC.presence_of_element_located((By.XPATH, xpath4)))
        elements = driver.find_elements(By.XPATH, xpath4)
    except Exception:
        logger.info(f'아고다 크롤링 xpath4에서 오류남')
        return

    for element in elements:
        try:
            href_element = element.find_element(By.XPATH, xpath6)
        except Exception:
            href_element = url
        try:
            src_element = element.find_element(By.XPATH, xpath7)
        except Exception:
            src_element = '이미지를 가지고 오지 못했습니다.'
        origin = re.sub(r'\n예약 무료 취소|,|₩\s|페이지.*?\n', '', element.get_attribute('innerText'))

        if '모두 보기' in origin:
            origin = origin.split('모두 보기\n')[1]
        # origin = origin.split('모두 보기\n')[1].split('\n')
        # result.append(origin)
        if '판매 완료' in origin:
            continue
        # if origin[len(origin) - 1].isdigit() == False :
        #     continue
        origin = origin.split('\n')
        if '일정에 여유가 있으시다면 다음의 대체 날짜들도 고려해 보시기 바랍니다' in origin[0]:
            continue
        if href_element != url:
            href_element = href_element.get_attribute('href')
        if src_element != '이미지를 가지고 오지 못했습니다.':
            src_element = src_element.get_attribute('src')
        if len(origin[0])==1:
            continue
        multi_list[k].put(Hotel(origin[0], start, end, '', origin[len(origin) - 1], int(origin[len(origin) - 1]), href_element, src_element, '아고다'))
        # logger.info(f'{origin[0]}, {start}, {end}, , {origin[len(origin) - 1]}, {int(origin[len(origin) - 1])}, {href_element}, {src_element}, 아고다')
    driver.quit()
