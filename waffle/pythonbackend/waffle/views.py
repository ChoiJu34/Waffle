from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def convert_data(request):
    if request.method == 'POST':
        # Spring Boot로부터 데이터 수신
        data = json.loads(request.body)

        # Spring Boot로 응답
        response_data = {
            'result': 'accept success'
        }

        return HttpResponse(json.dumps(response_data), content_type="application/json")