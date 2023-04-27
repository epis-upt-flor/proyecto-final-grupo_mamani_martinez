from flask import Flask, request, jsonify
from controllers import Predict
import sys
sys.path.append('..')
from utils import validation


app = Flask(__name__)
prediction = Predict()
@app.route("/predict/question", methods=["POST"])
def predictQuestion():
    try:
        print(request.headers.get("Token"))
        validation.validate_token(request.headers.get("Token"))
    except Exception as e:
        return jsonify({"error": str(e)}), 401
    data = request.get_json()
    text=data.get("data")
    label = prediction.prediction_Question(text)
    return jsonify(label)
@app.route("/predict/product", methods=["POST"])
def predictProduct():
    data = request.get_json()
    text=data.get("data")
    return jsonify(text)

@app.route("/train", methods=["POST"])
def train():
    data = request.get_json()
    #model = training_api.train(data)
    #return jsonify(model)
@app.route("/", methods=["GET"])
def default_response():
    return """
    <html>
        <head>
            <title>API</title>
        </head>
        <body>
            <p>Los métodos POST disponibles son:</p>
            <ul>
                <li>/predict</li>
                <li>/train</li>
            </ul>
        </body>
    </html>
    """
if __name__ == "__main__":
    app.run()