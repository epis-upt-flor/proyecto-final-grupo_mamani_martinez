from flask import Flask, request, jsonify
from controllers import prediction_api, training_api

app = Flask(__name__)


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    prediction = prediction_api.predict(data)
    return jsonify(prediction)

@app.route("/train", methods=["POST"])
def train():
    data = request.get_json()
    model = training_api.train(data)
    return jsonify(model)

if __name__ == "__main__":
    app.run()