from flask import Flask, request, jsonify
from controllers import Predict
import sys
import pandas as pd
sys.path.append('..')
from utils import api_key_required,check_data,treatment
from celery import Celery

app = Flask(__name__)

prediction = Predict()

app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'

def make_celery(app):
    celery = Celery(app.name, broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)

    class ContextTask(celery.Task):
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return self.run(*args, **kwargs)

    celery.Task = ContextTask
    return celery

celery = make_celery(app)

@celery.task()
def train_model_task():
    file = request.files['file']
    X_train, y_train, X_val, y_val, _, _, _ = treatment(file)
    prediction.model.training(X_train, y_train, X_val, y_val)

@app.route("/predict/question", methods=["POST"])
@api_key_required
@check_data
def predictQuestion():
    data = request.get_json()
    text=data.get("data")
    label = prediction.prediction_Question(text)
    return jsonify(label)


@app.route("/predict/product", methods=["POST"])
@api_key_required
@check_data
def predictProduct():
    data = request.get_json()
    text=data.get("data")
    return jsonify(text)


@app.route("/train_model", methods=["POST"])
@api_key_required
def train_model():
    train_model_task.delay()
    return jsonify({"message": "Model training started"})


@app.route("/", methods=["GET"])
def default_response():
    return """
    <html>
        <head>
            <title>API</title>
        </head>
        <body>
            <p>Vista</p>
        </body>
    </html>
    """
if __name__ == "__main__":
    app.run()