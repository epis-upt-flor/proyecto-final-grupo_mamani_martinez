import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Input, Dense, Dropout, Embedding, Bidirectional, LSTM, BatchNormalization
from tensorflow.keras.regularizers import l2
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.preprocessing.sequence import pad_sequences
from transformers import TFBertModel, BertTokenizer
from tensorflow.keras.optimizers import Adam
import pandas as pd
import numpy as np
from .model import Model
import sys
sys.path.append('..')
from utils import treatment
from config import MAX_LENGHT

class ModelHybrid(Model):
    def __init__(self, modelName, dataName):
        super().__init__(modelName)
        try:
            self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
            _, _, _, _, self.etiqueta_dict = treatment(dataName,self.tokenizer)
            self.model=self.load_models(customObject={'TFBertModel': TFBertModel})
            if self.model is None:
                raise ValueError("The model could not be loaded.")

        except Exception as error:
            print("Error:", str(error))


    def build_model(self):
        try:
            '''Model BERT'''

            bert_model = TFBertModel.from_pretrained('bert-base-uncased')

            input_ids = Input(shape=(MAX_LENGHT,), dtype=tf.int32)
            attention_mask = Input(shape=(MAX_LENGHT,), dtype=tf.int32)

            bert_output = bert_model(input_ids, attention_mask=attention_mask)[0]

            vocab_size = len(self.tokenizer.vocab)

            '''Model'''

            embedding = Embedding(input_dim=vocab_size, output_dim=128, input_length=MAX_LENGHT)(input_ids)
            lstm = Bidirectional(LSTM(128, dropout=0.2, recurrent_dropout=0.2, kernel_regularizer=l2(1e-4), recurrent_regularizer=l2(1e-4)))(embedding)
            dense1 = Dense(128, activation='relu', kernel_regularizer=l2(1e-4))(lstm)
            dense1 = BatchNormalization()(dense1)
            dropout1 = Dropout(0.5)(dense1)
            dense2 = Dense(64, activation='relu', kernel_regularizer=l2(1e-4))(dropout1)
            dense2 = BatchNormalization()(dense2)
            dropout2 = Dropout(0.5)(dense2)

            '''Combinar'''

            combined = tf.concat([bert_output[:, 0, :], dropout2], axis=-1)

            output = Dense(len(self.etiqueta_dict), activation='softmax')(combined)

            self.model= Model(inputs=[input_ids, attention_mask], outputs=output)

            self.model.compile(optimizer=Adam(), loss='categorical_crossentropy', metrics=['accuracy'])

            self.early_stopping = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
        except Exception as error:
            print("Error:", str(error))

    def predict(self, text, threshold=0.5):
        try:
            if self.model is None:
                raise ValueError("The model must be trained first.")
            elif self.changeModel is True:
                self.load_models(customObject={'TFBertModel': TFBertModel})
                self.changeModel = False

            encoding = self.tokenizer(text, truncation=True, padding='max_length', max_length=MAX_LENGHT, return_tensors='tf')
            pred_proba = self.model.predict([encoding['input_ids'], encoding['attention_mask']])[0]

            index_etiqueta_dict = {v: k for k, v in self.etiqueta_dict.items()}

            pred_etiquetas = {index_etiqueta_dict[i]: proba for i, proba in enumerate(pred_proba) if proba > threshold}

            if not pred_etiquetas:
                pred_etiquetas['None'] = 1.0

            return {key for key in pred_etiquetas.keys()}

        except ValueError as error:
            return str(error)

    def training(self, train_encodings, y_train, val_encodings, y_val, batch_size=32, epochs=10):
        if self.model is None:
            self.build_model()

        self.model.fit(
            [train_encodings['input_ids'], train_encodings['attention_mask']],
            y_train,
            validation_data=([val_encodings['input_ids'], val_encodings['attention_mask']], y_val),
            epochs=10,
            batch_size=32,
            callbacks=[self.early_stopping]
        )
        self.save_model()


