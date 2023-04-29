import sys
from functools import wraps
from flask import request, jsonify
sys.path.append('..')
from config import API_KEY
import base64

def api_key_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key_encoded = request.headers.get("Token")
        if not api_key_encoded:
            return jsonify({"error": "Token header is missing"}), 400

        api_key = base64.b64decode(api_key_encoded).decode("utf-8")

        try:
            validate_token(api_key)
        except Exception as e:
            return jsonify({"error": str(e)}), 401

        return f(*args, **kwargs)

    return decorated_function

def check_data(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        data = request.get_json()
        
        if data is None or not data.get("data"):
            return jsonify({"error": "JSON data is missing or 'data' key not found"}), 400
        return f(*args, **kwargs)

    return decorated_function
def validate_token(api_key):
    if api_key != API_KEY:
        raise Exception("API KEY not found in environment variables")