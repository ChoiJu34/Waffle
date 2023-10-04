from django.contrib.sessions.models import Session
from django.http import JsonResponse
from django.utils import timezone
from rest_framework.decorators import api_view

from django.conf import settings
import logging

# 로깅 설정
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


@api_view(['GET'])
def waiting(request):
    waiting = getattr(settings, 'clientCnt', 0)

    count = {
        "count": waiting
    }
    return JsonResponse(count)

def get_clients_count_for_api_endpoint(endpoint_path):
    # 현재 시각
    current_time = timezone.now()

    # 'package/recommend' 엔드포인트와 연결된 세션 수 조회
    api_sessions = Session.objects.filter(
        expire_date__gte=current_time,  # 만료되지 않은 세션 필터링
        session_data__contains=endpoint_path  # API 엔드포인트 경로를 포함하는 세션 필터링
    )

    # 세션 수 반환
    return api_sessions.count()
