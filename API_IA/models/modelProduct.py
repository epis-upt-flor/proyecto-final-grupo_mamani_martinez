from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, LSTM, Dropout, Dense
from tensorflow.keras.callbacks import EarlyStopping
from .model import Model
import sys
sys.path.append('..')
from utils import treatment

class ModelProduct(Model):
    def __init__(self, vocab_size,etiqueta_dict,tokenizer,modelName):
        X_train, y_train, X_val, y_val, vocab_size, etiqueta_dict, tokenizer = treatment('data_product')
        super().__init__(vocab_size,etiqueta_dict,tokenizer,modelName)
        self.load_models()
        if(self.model is None):
            self.training(X_train, y_train, X_val, y_val)
    def build_model(self):
        model = Sequential()
        model.add(Embedding(self.vocab_size, 128, input_length=self.max_length))
        model.add(LSTM(128, dropout=0.2, recurrent_dropout=0.2))
        model.add(Dense(64, activation='relu'))
        model.add(Dropout(0.5))
        model.add(Dense(len(self.etiqueta_dict), activation='softmax'))
        
        self.early_Stopping = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
        
        model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])
        self.model = model

