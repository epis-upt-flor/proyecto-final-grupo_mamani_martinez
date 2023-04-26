from flask import Flask, request, jsonify
from controllers import predictModel
import sys
sys.path.append('..')
from config import API_KEY,SECRET_KEY

token = "upt2023"

app = Flask(__name__)
@app.route("/predict", methods=["POST"])
def predict():

    if request.headers.get("Token") != token:
        return jsonify({"error": "Invalid Token"}), 401
    data = request.get_json()
    text=data.get("data")
    prediction = predictModel(text)
    return jsonify(prediction)

@app.route("/train", methods=["POST"])
def train():
    data = request.get_json()
    #model = training_api.train(data)
    #return jsonify(model)

if __name__ == "__main__":
    app.run()