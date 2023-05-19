import sys
sys.path.append('..')
from models import modelConsultHybrid

class Predict(object):
    def __init__(self,modeNameQ='hybrid_model',modeNameP='arthas_v'):
        self.modelQuestion = modelConsultHybrid.ModelHybrid(modeNameQ,"data_Question")
        #self.modelProduct = modelHybrid(modeNameP,"data_Product")
    def predictionQuestion(self,text):
        predicted=self.modelQuestion.predict(text)
        return (f"{predicted}")
    def predictionProduct(self,text):
        _, top_predicted_labels=self.modelProduct.predict(text)
        return (f"Etiqueta : {top_predicted_labels}")

