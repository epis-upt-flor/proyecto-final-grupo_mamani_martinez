from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pandas as pd
import numpy as np
import sys
import os
import datetime
import time
current_time = datetime.datetime.now()
sys.path.append('..')
from config import MAX_LENGHT,MODEL_PATH

print("Fecha y hora actual:", current_time)

class Model(object):
    model_path = MODEL_PATH
    max_length = MAX_LENGHT
    def __init__(self,vocab_size,etiqueta_dict,tokenizer,modelName):
        self.vocab_size = vocab_size
        self.tokenizer = tokenizer
        self.etiqueta_dict = etiqueta_dict
        self.early_Stopping = None
        self.model = None
        self.modelName = modelName
        self.changeModel = False
    def load_models(self):
        file = f'{self.model_path}\{self.modelName}.h5'
        if (os.path.exists(file)):
            self.model = load_model(file)
        else:
            self.model = None
    def build_model(self):
        pass
    def training(self, X_train, y_train, X_val, y_val, batch_size=32, epochs=10):
        if self.model is None:
            self.build_model()
        self.model.fit(X_train, y_train, epochs=epochs, batch_size=batch_size, validation_data=(X_val, y_val), callbacks=[self.early_Stopping])
        self.save_model()
    def predict(self,text):
        if self.model is None:
            print("The model was not found")
            raise ValueError("The model must be trained first.")
        elif self.changeModel is True:
            self.load_models()
            self.changeModel = False
        sequence = self.tokenizer.texts_to_sequences([text])
        sequence = pad_sequences(sequence, maxlen=150, padding='post')

        prediction = self.model.predict(sequence)
        predicted_label_indices = np.argsort(prediction, axis=1)[:, ::-1][:, :5]
        top_predicted_labels = []
        for indices in predicted_label_indices:
            top_labels = []
            for index in indices:
                if index in self.etiqueta_dict.values():
                    label = list(self.etiqueta_dict.keys())[list(self.etiqueta_dict.values()).index(index)]
                    top_labels.append(label)
            top_predicted_labels.append(top_labels)

        predicted_label_index = np.argmax(prediction)
        predicted_label = list(self.etiqueta_dict.keys())[list(self.etiqueta_dict.values()).index(predicted_label_index)]

        return predicted_label, top_predicted_labels
    def save_model(self):
        if self.model is None:
            print("The model was not found")
            raise ValueError("The model must be trained first.")

        name = f'{self.modelName}_{datetime.datetime.now()}.h5'

        self.delete_model(self.modelName)

        self.modelName = name
        self.model.save(name)
        self.changeModel = True

    def delete_model(self,nameModel):
        time.sleep(3600)
        file = f'{self.model_path}\{nameModel}.h5'
        if (os.path.exists(file)):
            os.remove(file)
        else:
            raise ValueError(f"Not Exist : {file}")
    def summary(self):
        self.model.summary()

