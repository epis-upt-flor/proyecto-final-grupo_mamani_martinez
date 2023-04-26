import base64
import os
import sys
sys.path.append('..')
from config import API_KEY,SECRET_KEY

def validate_token(token):
    decoded = base64.b64decode(token).decode("utf-8")
    api_key, secret_key = decoded.split("|")
    if api_key != API_KEY or secret_key != SECRET_KEY:
        raise Exception("API KEY or SECRET KEY not found in environment variables")