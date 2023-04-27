import os

PORT = int(os.environ.get("PORT", 5000))
DEBUG = os.environ.get("DEBUG", True)
MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models")
DATA_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
DATABASE_URL = os.environ.get("DATABASE_URL")
REQUEST_LIMIT = "10mb"
API_KEY = "qwe"
#os.environ.get("API_KEY")

MAX_LENGHT = 150