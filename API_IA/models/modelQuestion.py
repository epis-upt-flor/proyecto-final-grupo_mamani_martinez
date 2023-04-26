from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Bidirectional, LSTM, Dropout, Dense
from tensorflow.keras.regularizers import l2
from tensorflow.keras.callbacks import EarlyStopping
from .model import Model
import sys
sys.path.append('..')
from utils import treatment

class ModelQuestion(Model):
    def __init__(self,modelName):
        X_train, y_train, X_val, y_val, vocab_size, etiqueta_dict, tokenizer = treatment('data')
        super().__init__(X_train, y_train, X_val, y_val,vocab_size,etiqueta_dict,tokenizer,modelName)
    def build_model(self):
        model = Sequential()
        model.add(Embedding(self.vocab_size, 128, input_length=self.max_length))
        model.add(Bidirectional(LSTM(128, return_sequences=True, kernel_regularizer=l2(0.01))))
        model.add(Dropout(0.5))
        model.add(Bidirectional(LSTM(128, kernel_regularizer=l2(0.01))))
        model.add(Dropout(0.5))
        model.add(Dense(len(self.etiqueta_dict), activation='softmax'))

        model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

        self.early_Stopping = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
        self.model = model


