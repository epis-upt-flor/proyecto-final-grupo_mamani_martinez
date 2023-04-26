from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Bidirectional, LSTM, Dropout, Dense
from tensorflow.keras.regularizers import l2
from tensorflow.keras.callbacks import EarlyStopping
from model import Model

class ModelProduct(Model):
    def __init__(self, vocab_size,etiqueta_dict,tokenizer,modelName):
        super().__init__(vocab_size,etiqueta_dict,tokenizer,modelName)
    def build_model(self):
        pass


