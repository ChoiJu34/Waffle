import copy
import json
import logging
import queue
import threading

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

result={
    "plane" : "",
    "hotel" : "",
    "card" : "",
    "memberCnt" : ""
}

@api_view(['POST'])
def crawling(request):
    data = json.loads(request.body)

    threads = []
    for k in range(2):
        thread = threading.Thread(target=hotel_or_plane, args=((k, data),))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    find_lowest_package(data)

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


def find_lowest_package(data):
    planePlane_cnt = len(data["planPlane"])
    planeHotel_cnt = len(data["planHotel"])
    # plane_infos_save = copy.deepcopy(plane_infos)
    # hotel_infos_save = copy.deepcopy(hotel_infos)
    plane_infos_save = [queue.PriorityQueue() for _ in range(planePlane_cnt)]
    hotel_infos_save = [queue.PriorityQueue() for _ in range(planeHotel_cnt)]


    card_company = [[0, False, "하나"], [0, False, "신한"], [0, False, "현대"], [0, False, "국민"], [0, False, "우리"], [0, False, "삼성"], [0, False, "롯데"], [0, False, "NH"], [0, False, "카드 없음"]]

    plane_info = []
    hotel_info = []

    for pp in range(planePlane_cnt):
        info = plane_infos[pp].get()
        plane_infos_save[pp].put(info)
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
            plane_infos_save[pp].put(info)
        for no in range(9):
            if not card_company[no][1]:
                card_company[no][0] += info.discountPrice
            card_company[no][1] = False

    for ph in range(planeHotel_cnt):
        info = hotel_infos[ph].get()
        hotel_infos_save[ph].put(info)
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
            hotel_infos_save[ph].put(info)
        for no in range(9):
            if not card_company[no][1]:
                card_company[no][0] += info.discountPrice
            card_company[no][1] = False

    logger.info(card_company)
    set_card = min(card_company)

    card_name = ""
    for pp in range(planePlane_cnt):
        info = plane_infos_save[pp].get()
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
            info = plane_infos_save[pp].get()

    for ph in range(planeHotel_cnt):
        info = hotel_infos_save[ph].get()
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
            info = hotel_infos_save[pp].get()

    result["plane"] = plane_info
    result["hotel"] = hotel_info
    result["card"] = card_name
    result["memberCnt"] = data["memberCnt"]
