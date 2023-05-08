from tensorflow.keras.models import load_model
import pandas as pd
import numpy as np
import sys
import os
import datetime
import time
sys.path.append('..')
from config import MAX_LENGHT,MODEL_PATH

class Model(object):
    model_path = MODEL_PATH
    max_length = MAX_LENGHT

    def __init__(self, vocab_size, etiqueta_dict, tokenizer, modelName):
        self.vocab_size = vocab_size
        self.tokenizer = tokenizer
        self.etiqueta_dict = etiqueta_dict
        self.early_Stopping = None
        self.model = None
        self.modelName = modelName
        self.changeModel = False

    def load_models(self):
        file = f'{self.model_path}/{self.modelName}.h5'
        if (os.path.exists(file)):
            self.model = load_model(file)
        else:
            self.model = None

    def build_model(self):
        pass

    def training(self, X_train, y_train, X_val, y_val, batch_size=32, epochs=50):
        if self.model is None:
            self.build_model()
        self.model.fit(X_train, y_train, epochs=epochs, batch_size=batch_size, validation_data=(X_val, y_val), callbacks=[self.early_Stopping])
        self.save_model()

    def predict(self, text):
        pass

    def save_model(self):
        try:
            if self.model is None:
                raise ValueError("The model must be trained first.")

            name = f'{self.model_path}/{self.modelName}_{datetime.datetime.now().strftime("%d-%m-%Y")}.h5'

            self.delete_model(self.modelName)

            self.modelName = name
            self.model.save(name)
            self.changeModel = True

        except ValueError as error:
            return str(error)

    def delete_model(self, nameModel):
        file = f'{self.model_path}/{nameModel}.h5'
        try:
            if (os.path.exists(file)):
                os.remove(file)
            else:
                raise ValueError(f"Not Exist: {file}")
        except ValueError as error:
            print("Error:", str(error))

    def summary(self):
        self.model.summary()