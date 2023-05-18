from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Bidirectional, LSTM, Dropout, Dense, BatchNormalization
from tensorflow.keras.regularizers import l2
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pandas as pd
import numpy as np
from .model import Model
import sys
sys.path.append('..')
from utils import treatment

class modelConsult(Model):
    def __init__(self, modelName,dataName):
        try:
            _, _, _, _, vocab_size, etiqueta_dict, tokenizer = treatment(dataName)
            super().__init__(vocab_size, etiqueta_dict, tokenizer, modelName)
            self.load_models()
            if self.model is None:
                raise ValueError("The model not load.")
        except Exception as error:
            print("Error:", str(error))
    def build_model(self):
        try:
            model = Sequential()
            model.add(Embedding(self.vocab_size, 128, input_length=self.max_length))
            model.add(Bidirectional(LSTM(128, dropout=0.2, recurrent_dropout=0.2, kernel_regularizer=l2(1e-4), recurrent_regularizer=l2(1e-4))))
            model.add(Dense(128, activation='relu', kernel_regularizer=l2(1e-4)))
            model.add(BatchNormalization())
            model.add(Dropout(0.5))
            model.add(Dense(64, activation='relu', kernel_regularizer=l2(1e-4)))
            model.add(Dropout(0.5))
            model.add(Dense(len(self.etiqueta_dict), activation='softmax'))

            model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

            self.early_Stopping = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
            self.model = model
        except Exception as error:
            print("Error:", str(error))
    def predict(self, text):
        try:
            if self.model is None:
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

        except ValueError as error:
            return str(error)


