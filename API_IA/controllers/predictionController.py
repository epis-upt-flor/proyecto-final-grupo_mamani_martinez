import sys
sys.path.append('..')
from models import modelConsultHybrid,modelNER

class Predict(object):
    def __init__(self,modeNameQ='hybrid_model'):
        self.modelQuestion = modelConsultHybrid.ModelHybrid(modeNameQ,"data_Question")
        self.modelProduct = modelNER.ModelNER()
    def predictionQuestion(self,text):
        predicted=self.modelQuestion.predict(text)
        return (f"{predicted}")
    def predictionProduct(self,text):
        predicted=self.modelProduct.predict(text)
        return (f"{predicted}")

