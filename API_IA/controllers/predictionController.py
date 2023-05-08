import sys
sys.path.append('..')
from models import modelConsult


class Predict(object):
    def __init__(self,modeNameQ='thrall_v',modeNameP='arthas_v'):
        self.modelQuestion = modelConsult(modeNameQ,"data_Question")
        self.modelProduct = modelConsult(modeNameP,"data_Product")
    def predictionQuestion(self,text):
        predicted_label, _=self.modelQuestion.predict(text)
        return (f"Etiqueta : {predicted_label}")
    def predictionProduct(self,text):
        _, top_predicted_labels=self.modelProduct.predict(text)
        return (f"Etiqueta : {top_predicted_labels}")

