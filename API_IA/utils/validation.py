import sys
sys.path.append('..')
from config import API_KEY

def validate_token(api_key):
    print(api_key)
    print(API_KEY)
    if api_key != API_KEY:
        raise Exception("API KEY not found in environment variables")