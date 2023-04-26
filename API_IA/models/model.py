from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pandas as pd
import numpy as np
import sys
import os
sys.path.append('..')
from config import MAX_LENGHT,MODEL_PATH

class Model(object):
    model_path = MODEL_PATH
    max_length = MAX_LENGHT
    def __init__(self, vocab_size,etiqueta_dict,tokenizer,modelName):
        self.vocab_size = vocab_size
        self.tokenizer = tokenizer
        self.etiqueta_dict = etiqueta_dict
        self.early_Stopping = None
        self.model = None
        self.modelName = modelName
        self.load_models()
    def load_models(self):
        file = f'{self.model_path}\{self.modelName}.h5'
        if not (os.path.exists(file)):
            self.model = None
        self.model = load_model(file)
    def build_model(self):
        pass
    def training(self, X_train, y_train, X_val, y_val, batch_size=32, epochs=10):
        if self.model is None:
            self.build_model()
        self.model.fit(X_train, y_train, epochs=100, batch_size=64, validation_data=(X_val, y_val), callbacks=[self.early_Stopping])
        self.save_model()
    def predict(self,text):
        if self.model is None:
            print("The model was not found")
            raise ValueError("The model must be trained first.")
        sequence = self.tokenizer.texts_to_sequences([text])
        sequence = pad_sequences(sequence, maxlen=150, padding='post')

        prediction = self.model.predict(sequence)
        predicted_label_indices = [np.argmax(pred) for pred in prediction]

        labels = {label: index for label, index in self.etiqueta_dict.items() if index in predicted_label_indices}
        full_label = " / ".join(labels.keys())

        return full_label
    def save_model(self):
        if self.model is None:
            print("The model was not found")
            raise ValueError("The model must be trained first.")
        self.model.save(f'{self.modelName}_new.h5')
