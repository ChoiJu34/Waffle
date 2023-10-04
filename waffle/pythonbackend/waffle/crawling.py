import copy
import json
import logging
import queue
import threading
import requests

from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view

from waffle import hotel
from waffle import plane

from django.conf import settings

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

# airplane={
#     "대한항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/KE.png',
#     "아시아나항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/OZ.png',
#     "티웨이항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/TW.png',
#     "에어서울" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/RS.png',
#     "제주항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/7C.png',
#     "진에어" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/LJ.png',
#     "에어프레미아" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/YP.png',
#     "에어부산" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/BX.png',
#     "에티오피아항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/ET.png',
#     "전일본공수" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/NH.png',
#     "일본항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/JL.png',
#     "이스타항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/ZE.png',
#     "싱카포르항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/SQ.png',
#     "말레이시아항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/MH.png',
#     "스리랑카항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/UL.png',
#     "베트남항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/VN.png',
#     "카타르항공" : 'https://openimage.interpark.com/tourpark/air/air_logo/m/QR.png',
#     "에티하드": 'https://openimage.interpark.com/tourpark/air/air_logo/m/EY.png',
#     "터키항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/TK.png',
#     "LOT POLISH AIRLINES": 'https://openimage.interpark.com/tourpark/air/air_logo/m/LO.png',
#     "에미레이트항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/EK.png',
#     "타이항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/TG.png',
#     "캐세이패시픽": 'https://openimage.interpark.com/tourpark/air/air_logo/m/CX.png',
#     "에바항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/BR.png',
#     "인도항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/AI.png',
#     "핀에어": 'https://openimage.interpark.com/tourpark/air/air_logo/m/AY.png',
#     "KLM네덜란드": 'https://openimage.interpark.com/tourpark/air/air_logo/m/KL.png',
#     "중국국제항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/CA.png',
#     "에어캐나다": 'https://openimage.interpark.com/tourpark/air/air_logo/m/AC.png',
#     "중국동방항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/MU.png',
#     "중국남방항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/CZ.png',
#     "에어마카오항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/CZ.png',
#     "산동항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/SC.png',
#     "중화항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/CI.png',
#     "가루다항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/GA.png',
#     "델타항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/DL.png"',
#     "하와이안항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/HA.png',
#     "사우디아항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/SV.png',
#     "루프트한자": 'https://openimage.interpark.com/tourpark/air/air_logo/m/LH.png',
#     "에어프랑스": 'https://openimage.interpark.com/tourpark/air/air_logo/m/AF.png',
#     "콴다스항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/QF.png',
#     "스쿠트항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/TR.png',
#     "그레이터 베이 항공": 'https://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAWCAMAAACWh252AAAATlBMVEVHcEwAsK0AraoArqsAr6wAsK0AsK0AsK0Ar6wAsK0AraoAsK0Aran3/Py/5eTq9vbS7OxNvruv394Wsq80uLZgw8GFz83a8O+Bzsx1yce5MyEpAAAAC3RSTlMA72OyM0t6gJQc2n6I4TYAAACMSURBVCiRxdHJEoMgEARQcQPsHhYFNf//ozHekgC3VPr6pqhmpuv+lknrvukATMPt5ZgaAy9HwxcSUHU3Z9jBoeo9s1/FVT8xwm3OE7Y2wOOUVVjtuGRx0UfUKgx7iLI6Yi67jke6HWPRDR+BSbbymuysAAbv8/XA8qmjUfd+wbTx+1J2Nvo95Qq/yRO6wQanQZ9ClQAAAABJRU5ErkJggg==',
#     "미아트몽골리안항공": 'https://openimage.interpark.com/tourpark/air/air_logo/m/OM.png',
#     "홍콩에어라인": 'https://openimage.interpark.com/tourpark/air/air_logo/m/HX.png',
# }

waiting = {
    "cnt": -1
}

hotel_or_plane_lock = threading.Lock()

@api_view(['POST'])
def crawling(request):
    waiting = getattr(settings, 'clientCnt', 0)
    logger.info(waiting)
    setattr(settings, 'clientCnt', waiting + 1)

    data = json.loads(request.body)
    logger.info(f"request.body : {data}")
    authorization = request.META.get('HTTP_AUTHORIZATION')
    logger.info(f"request.header : {authorization}")
    spring_boot_api_url = "https://j9d109.p.ssafy.io:8081/user-card/list"

    headers = {
        'Authorization': authorization,  # 예시: 인증 토큰을 설정하세요
        'Content-Type': 'application/json',  # 예시: Content-Type을 설정하세요
    }

    # Spring Boot API에 GET 요청을 보냅니다.
    try:
        response = requests.get(spring_boot_api_url, headers=headers)
    except:
        logger.info(f"user-card/list 불러오지 못함")

    user_cards = []
    # 요청이 성공하면 JSON 응답을 파싱합니다.
    if response.status_code == 200:
        user_cards = response.json()['result']

    logger.info(f"user_cards : {user_cards}")

    threads = []
    for k in range(1):
        thread = threading.Thread(target=main_thread, args=((data),))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    find_lowest_package(data, user_cards)

    waiting = getattr(settings, 'clientCnt', 0)
    logger.info(waiting)
    setattr(settings, 'clientCnt', waiting - 1)

    json_response = json.dumps(result, ensure_ascii=False).encode('utf-8')
    return HttpResponse(json_response, content_type="application/json;charset=utf-8")
    # else:
    #     logger.info("여기가 아니라???????????????")
    #     return JsonResponse(waiting)

def main_thread(data):
    threads = []

    hotel_or_plane_lock.acquire()
    try:
        for k in range(2):
            thread = threading.Thread(target=hotel_or_plane, args=((k, data),))
            threads.append(thread)
            thread.start()

        for thread in threads:
            thread.join()
    finally:
        hotel_or_plane_lock.release()


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
                # try:
                #     companyImg = airplane[info.name]
                # except:
                #     companyImg = 'none'
                plane_info.append({
                    "planeDate": info.date,
                    "company": info.name,
                    "startPlace": info.startPlace,
                    "startTime": info.startTime,
                    "endPlace": info.endPlace,
                    "endTime": info.endTime,
                    "originPrice": int(info.originPrice),
                    "discountPrice": int(info.discountPrice),
                    "layover": info.layover,
                    "during": info.long,
                    "site": info.site,
                    "card": info.card,
                    "companyImg": info.companyImg
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
                    "originPrice" : int(info.originPrice),
                    "discountPrice" : int(info.discountPrice),
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
                # try:
                #     companyImg = airplane[info.name]
                # except:
                #     companyImg = 'none'
                user_plane_info.append({
                    "planeDate": info.date,
                    "company": info.name,
                    "startPlace": info.startPlace,
                    "startTime": info.startTime,
                    "endPlace": info.endPlace,
                    "endTime": info.endTime,
                    "originPrice": int(info.originPrice),
                    "discountPrice": int(info.discountPrice),
                    "layover": info.layover,
                    "during": info.long,
                    "site": info.site,
                    "card": info.card,
                    "companyImg": info.companyImg
                })
                if len(card_name) < len(info.card):
                    card_name = info.card
                break
            elif any(card in info.card for card in user_have_card_company):#회사가 겹쳤을 때
                if(card+"카드" in info.card for card in user_have_card_company):#해당 회사 카드만 있어도 되는 할인이라면 넣고
                    # try:
                    #     companyImg = airplane[info.name]
                    # except:
                    #     companyImg = 'none'
                    user_plane_info.append({
                        "planeDate": info.date,
                        "company": info.name,
                        "startPlace": info.startPlace,
                        "startTime": info.startTime,
                        "endPlace": info.endPlace,
                        "endTime": info.endTime,
                        "originPrice": int(info.originPrice),
                        "discountPrice": int(info.discountPrice),
                        "layover": info.layover,
                        "during": info.long,
                        "site": info.site,
                        "card": info.card,
                        "companyImg": info.companyImg
                    })
                    if len(card_name) < len(info.card):
                        card_name = info.card
                    break
                elif (card["name"] in info.card for card in user_card):#특정 카드가 필요하다면 카드 명 비교
                    # try:
                    #     companyImg = airplane[info.name]
                    # except:
                    #     companyImg = 'none'
                    companyImg = 'none'
                    user_plane_info.append({
                        "planeDate": info.date,
                        "company": info.name,
                        "startPlace": info.startPlace,
                        "startTime": info.startTime,
                        "endPlace": info.endPlace,
                        "endTime": info.endTime,
                        "originPrice": int(info.originPrice),
                        "discountPrice": int(info.discountPrice),
                        "layover": info.layover,
                        "during": info.long,
                        "site": info.site,
                        "card": info.card,
                        "companyImg": info.companyImg
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
                    "originPrice": int(info.originPrice),
                    "discountPrice": int(info.discountPrice),
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
                        "originPrice": int(info.originPrice),
                        "discountPrice": int(info.discountPrice),
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
                        "originPrice": int(info.originPrice),
                        "discountPrice": int(info.discountPrice),
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


