from multiprocessing import Pool
import json
from django.http import HttpResponse
from rest_framework.decorators import api_view
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import re
import time
import threading
import logging
