import copy
import json
import logging
import queue
import threading
import requests

from django.http import HttpResponse
from rest_framework.decorators import api_view

from waffle import hotel
from waffle import plane

# 로깅 설정
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

q_list = []
plane_infos=[]
hotel_infos=[]

package = {
    "plane" : "",
    "hotel" : "",
    "card" : "",
    "memberCnt" : ""
}

have_card_package = {
    "plane" : "",
    "hotel" : "",
    "memberCnt" : ""
}

result={
    "package" : package,
    "userPackage" : have_card_package,
}

@api_view(['POST'])
def crawling(request):
    data = json.loads(request.body)
    authorization = request.META.get('HTTP_AUTHORIZATION')
    logger.info(f"request.body : {data}")
    logger.info(f"request.header : {authorization}")
    spring_boot_api_url = "https://j9d109.p.ssafy.io:8081/user-card/list"

    headers = {
        'Authorization': authorization,  # 예시: 인증 토큰을 설정하세요
        'Content-Type': 'application/json',  # 예시: Content-Type을 설정하세요
    }

    # Spring Boot API에 GET 요청을 보냅니다.
    response = requests.get(spring_boot_api_url, headers=headers)

    user_cards = []
    # 요청이 성공하면 JSON 응답을 파싱합니다.
    if response.status_code == 200:
        user_cards = response.json()['result']

    threads = []
    for k in range(2):
        thread = threading.Thread(target=hotel_or_plane, args=((k, data),))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    find_lowest_package(data, user_cards)

    json_response = json.dumps(result, ensure_ascii=False).encode('utf-8')
    return HttpResponse(json_response, content_type="application/json;charset=utf-8")


def hotel_or_plane(info):
    k, data = info
    global plane_infos
    global hotel_infos

    if k==0:
        # plane_infos.append(plane.plane(data))
        plane_infos = plane.plane(data)
    elif k==1:
        # hotel_infos.append(hotel.hotel(data))
        hotel_infos = hotel.hotel(data)


def find_lowest_package(data, user_cards):
    planePlane_cnt = len(data["planPlane"])
    planeHotel_cnt = len(data["planHotel"])
    # plane_infos_save = copy.deepcopy(plane_infos)
    # hotel_infos_save = copy.deepcopy(hotel_infos)
    plane_infos_save1 = [queue.PriorityQueue() for _ in range(planePlane_cnt)]
    hotel_infos_save1 = [queue.PriorityQueue() for _ in range(planeHotel_cnt)]
    plane_infos_save2 = [queue.PriorityQueue() for _ in range(planePlane_cnt)]
    hotel_infos_save2 = [queue.PriorityQueue() for _ in range(planeHotel_cnt)]


    card_company = [[0, False, "하나"], [0, False, "신한"], [0, False, "현대"], [0, False, "국민"], [0, False, "우리"], [0, False, "삼성"], [0, False, "롯데"], [0, False, "NH"], [0, False, "카드 없음"]]

    plane_info = []
    hotel_info = []
    user_plane_info = []
    user_hotel_info = []

    for pp in range(planePlane_cnt):
        info = plane_infos[pp].get()
        plane_infos_save1[pp].put(info)
        plane_infos_save2[pp].put(info)
        while info.card != '' and plane_infos[pp]:
            if '하나' in info.card and not card_company[0][1]:
                card_company[0][0] += info.discountPrice
                card_company[0][1] = True
            elif '신한' in info.card and not card_company[1][1]:
                card_company[1][0] += info.discountPrice
                card_company[1][1] = True
            elif '현대' in info.card and not card_company[2][1]:
                card_company[2][0] += info.discountPrice
                card_company[2][1] = True
            elif '국민' in info.card and not card_company[3][1]:
                card_company[3][0] += info.discountPrice
                card_company[3][1] = True
            elif '우리' in info.card and not card_company[4][1]:
                card_company[4][0] += info.discountPrice
                card_company[4][1] = True
            elif '삼성' in info.card and not card_company[5][1]:
                card_company[5][0] += info.discountPrice
                card_company[5][1] = True
            elif '롯데' in info.card and not card_company[6][1]:
                card_company[6][0] += info.discountPrice
                card_company[6][1] = True
            elif 'NH' in info.card and not card_company[7][1]:
                card_company[7][0] += info.discountPrice
                card_company[7][1] = True
            info = plane_infos[pp].get()
            plane_infos_save1[pp].put(info)
            plane_infos_save2[pp].put(info)
        for no in range(9):
            if not card_company[no][1]:
                card_company[no][0] += info.discountPrice
            card_company[no][1] = False

    for ph in range(planeHotel_cnt):
        info = hotel_infos[ph].get()
        hotel_infos_save1[ph].put(info)
        hotel_infos_save2[ph].put(info)
        while info.card != '' and plane_infos[pp]:
            if '하나' in info.card and not card_company[0][1]:
                card_company[0][0] += info.discountPrice
                card_company[0][1] = True
            elif '신한' in info.card and not card_company[1][1]:
                card_company[1][0] += info.discountPrice
                card_company[1][1] = True
            elif '현대' in info.card and not card_company[2][1]:
                card_company[2][0] += info.discountPrice
                card_company[2][1] = True
            elif '국민' in info.card and not card_company[3][1]:
                card_company[3][0] += info.discountPrice
                card_company[3][1] = True
            elif '우리' in info.card and not card_company[4][1]:
                card_company[4][0] += info.discountPrice
                card_company[4][1] = True
            elif '삼성' in info.card and not card_company[5][1]:
                card_company[5][0] += info.discountPrice
                card_company[5][1] = True
            elif '롯데' in info.card and not card_company[6][1]:
                card_company[6][0] += info.discountPrice
                card_company[6][1] = True
            elif 'NH' in info.card and not card_company[7][1]:
                card_company[7][0] += info.discountPrice
                card_company[7][1] = True
            info = hotel_infos[ph].get()
            hotel_infos_save1[ph].put(info)
            hotel_infos_save2[ph].put(info)
        for no in range(9):
            if not card_company[no][1]:
                card_company[no][0] += info.discountPrice
            card_company[no][1] = False

    logger.info(card_company)
    set_card = min(card_company)

    # 우리가 추천하는 카드로 최저가
    card_name = ""
    for pp in range(planePlane_cnt):
        info = plane_infos_save1[pp].get()
        while True:
            if info.card=='' or set_card[2] in info.card:
                plane_info.append({
                    "planeDate": info.date,
                    "company": info.name,
                    "startPlace": info.startPlace,
                    "startTime": info.startTime,
                    "endPlace": info.endPlace,
                    "endTime": info.endTime,
                    "originPrice": info.originPrice,
                    "discountPrice": info.discountPrice,
                    "layover": info.layover,
                    "during": info.long,
                    "site": info.site,
                    "card": info.card
                })
                if len(card_name)<len(info.card):
                    card_name = info.card
                break
            info = plane_infos_save1[pp].get()

    for ph in range(planeHotel_cnt):
        info = hotel_infos_save1[ph].get()
        while True:
            if info.card=='' or set_card[2] in info.card:
                hotel_info.append({
                    "hotelName" : info.name,
                    "start" : info.start,
                    "end" : info.end,
                    "card" : info.card,
                    "originPrice" : info.originPrice,
                    "discountPrice" : info.discountPrice,
                    "url" : info.url,
                    "img" : info.img,
                    "site" : info.site,
                })
                if len(card_name)<len(info.card):
                    card_name = info.card
                break
            info = hotel_infos_save1[pp].get()

    #사용자가 보유한 카드로 최저가
    user_have_card_company=[]
    for user_card in user_cards:
        user_card_name = user_card["company"]
        if '하나' in user_card_name and not card_company[0][1]:
            card_company[0][1] = True
            user_have_card_company.append('하나')
        elif '신한' in user_card_name and not card_company[1][1]:
            card_company[1][1] = True
            user_have_card_company.append('신한')
        elif '현대' in user_card_name and not card_company[2][1]:
            card_company[2][1] = True
            user_have_card_company.append('현대')
        elif '국민' in user_card_name and not card_company[3][1]:
            card_company[3][1] = True
            user_have_card_company.append('국민')
        elif '우리' in user_card_name and not card_company[4][1]:
            card_company[4][1] = True
            user_have_card_company.append('우리')
        elif '삼성' in user_card_name and not card_company[5][1]:
            card_company[5][1] = True
            user_have_card_company.append('삼성')
        elif '롯데' in user_card_name and not card_company[6][1]:
            card_company[6][1] = True
            user_have_card_company.append('롯데')
        elif 'NH' in user_card_name and not card_company[7][1]:
            card_company[7][1] = True
            user_have_card_company.append('NH')

    for pp in range(planePlane_cnt):
        info = plane_infos_save2[pp].get()
        while True:
            if info.card == '':#카드 없으면 넣고
                user_plane_info.append({
                    "planeDate": info.date,
                    "company": info.name,
                    "startPlace": info.startPlace,
                    "startTime": info.startTime,
                    "endPlace": info.endPlace,
                    "endTime": info.endTime,
                    "originPrice": info.originPrice,
                    "discountPrice": info.discountPrice,
                    "layover": info.layover,
                    "during": info.long,
                    "site": info.site,
                    "card": info.card
                })
                if len(card_name) < len(info.card):
                    card_name = info.card
                break
            elif any(card in info.card for card in user_have_card_company):#회사가 겹쳤을 때
                if(card+"카드" in info.card for card in user_have_card_company):#해당 회사 카드만 있어도 되는 할인이라면 넣고
                    user_plane_info.append({
                        "planeDate": info.date,
                        "company": info.name,
                        "startPlace": info.startPlace,
                        "startTime": info.startTime,
                        "endPlace": info.endPlace,
                        "endTime": info.endTime,
                        "originPrice": info.originPrice,
                        "discountPrice": info.discountPrice,
                        "layover": info.layover,
                        "during": info.long,
                        "site": info.site,
                        "card": info.card
                    })
                    if len(card_name) < len(info.card):
                        card_name = info.card
                    break
                elif (card["name"] in info.card for card in user_card):#특정 카드가 필요하다면 카드 명 비교
                    user_plane_info.append({
                        "planeDate": info.date,
                        "company": info.name,
                        "startPlace": info.startPlace,
                        "startTime": info.startTime,
                        "endPlace": info.endPlace,
                        "endTime": info.endTime,
                        "originPrice": info.originPrice,
                        "discountPrice": info.discountPrice,
                        "layover": info.layover,
                        "during": info.long,
                        "site": info.site,
                        "card": info.card
                    })
                    if len(card_name) < len(info.card):
                        card_name = info.card
                    break
            info = plane_infos_save2[pp].get()

    for ph in range(planeHotel_cnt):
        info = hotel_infos_save2[ph].get()
        while True:
            if info.card == '':#카드 없으면 넣고
                user_hotel_info.append({
                    "hotelName": info.name,
                    "start": info.start,
                    "end": info.end,
                    "card": info.card,
                    "originPrice": info.originPrice,
                    "discountPrice": info.discountPrice,
                    "url": info.url,
                    "img": info.img,
                    "site": info.site,
                })
                if len(card_name) < len(info.card):
                    card_name = info.card
                break
            elif any(card in info.card for card in user_have_card_company):#회사가 겹쳤을 때
                if(card+"카드" in info.card for card in user_have_card_company):#해당 회사 카드만 있어도 되는 할인이라면 넣고
                    user_hotel_info.append({
                        "hotelName": info.name,
                        "start": info.start,
                        "end": info.end,
                        "card": info.card,
                        "originPrice": info.originPrice,
                        "discountPrice": info.discountPrice,
                        "url": info.url,
                        "img": info.img,
                        "site": info.site,
                    })
                    if len(card_name) < len(info.card):
                        card_name = info.card
                    break
                elif (card["name"] in info.card for card in user_card):#특정 카드가 필요하다면 카드 명 비교
                    user_hotel_info.append({
                        "hotelName": info.name,
                        "start": info.start,
                        "end": info.end,
                        "card": info.card,
                        "originPrice": info.originPrice,
                        "discountPrice": info.discountPrice,
                        "url": info.url,
                        "img": info.img,
                        "site": info.site,
                    })
                    if len(card_name) < len(info.card):
                        card_name = info.card
                    break
            info = hotel_infos_save2[pp].get()


    package["plane"] = plane_info
    package["hotel"] = hotel_info
    package["card"] = card_name
    package["memberCnt"] = data["memberCnt"]

    have_card_package["plane"] = user_plane_info
    have_card_package["hotel"] = user_hotel_info
    have_card_package["memberCnt"] = data["memberCnt"]


