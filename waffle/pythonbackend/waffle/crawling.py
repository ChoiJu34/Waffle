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

result = []
q_list = []

hotel_info = []
plane_info = []

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
        "plane" : plane_info[0],
        "hotel" : hotel_info[0]
    }

    json_response = json.dumps(result, ensure_ascii=False).encode('utf-8')
    return HttpResponse(json_response, content_type="application/json;charset=utf-8")


def hotel_or_plane(info):
    k, data = info
    if k==0:
        hotel_info.append(hotel.hotel(data))
    elif k==1:
        plane_info.append(plane.plane(data))