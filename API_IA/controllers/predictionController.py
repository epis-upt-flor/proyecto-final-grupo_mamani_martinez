import sys
sys.path.append('..')
from models import ModelQuestion


class Predict(object):
    def __init__(self,modeNameQ='thrall_v',modeNameP=''):
        self.model = ModelQuestion(modeNameQ)
    def prediction_Question(self,text):
        label=self.model.predict(text)
        return (f"Etiqueta : {label}")
