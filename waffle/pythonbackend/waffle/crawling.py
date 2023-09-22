import json
import logging
import threading

from django.http import HttpResponse
from rest_framework.decorators import api_view

from waffle import hotel
from waffle import plane

# 로깅 설정
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

q_list = []
plane_infos = []
hotel_infos = []

result={
    "plane": "",
    "hotel": ""
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

    result = {
        "plane": plane_infos,
        "hotel": hotel_infos
    }

    json_response = json.dumps(result, ensure_ascii=False).encode('utf-8')
    return HttpResponse(json_response, content_type="application/json;charset=utf-8")


def hotel_or_plane(info):
    k, data = info

    if k==0:
        plane_infos.append(plane.plane(data))
    elif k==1:
        hotel_infos.append(hotel.hotel(data))

    # find_lowest_package(data, plane_infos, hotel_infos)


# def find_lowest_package(data, plane_infos, hotel_infos):
#     planePlane_cnt = len(data["planPlane"])
#     planeHotel_cnt = len(data["planHotel"])
#
#     hotel_info = []
#     plane_info = []
#
#     logger.debug(f"?????????????????????????????????{plane_infos}")
#     logger.debug(f"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!{hotel_infos}")
#
#     for pp in range(planePlane_cnt):
#         plane_info.append(plane_infos[pp].get())
#
#     for ph in range(planeHotel_cnt):
#         hotel_info.append(hotel_infos[ph].get())
#
#     result["plane"] = plane_info
#     result["hotel"] = hotel_info
