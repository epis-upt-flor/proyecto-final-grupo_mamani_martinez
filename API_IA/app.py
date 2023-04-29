from flask import Flask, request, jsonify
from controllers import Predict
import sys
sys.path.append('..')
from utils import api_key_required,check_data
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
    #
    pass

@app.route("/predict/question", methods=["POST"])
@api_key_required
@check_data
def predictQuestion():
    data = request.get_json()
    text=data.get("data")
    label = prediction.prediction_Question(text)
    return jsonify(label)


@app.route("/predict/product", methods=["POST"])
def predictProduct():
    data = request.get_json()
    text=data.get("data")
    return jsonify(text)


@app.route("/train_model", methods=["POST"])
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