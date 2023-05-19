from tensorflow.keras.models import load_model
from transformers import TFBertModel, BertTokenizer
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

    def __init__(self,modelName):

        self.early_Stopping = None
        self.etiqueta_dict = None
        self.modelName = modelName
        self.changeModel = False
        self.model = None

    def load_models(self, customObject=None):
        model = None
        file = f'{self.model_path}/{self.modelName}.h5'
        if os.path.exists(file):
            model = load_model(file, custom_objects=customObject)
            print("Model loaded successfully")
        else:
            raise ValueError("Model file does not exist")
        return model


    def build_model(self):
        pass

    def training(self):
        pass

    def predict(self):
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