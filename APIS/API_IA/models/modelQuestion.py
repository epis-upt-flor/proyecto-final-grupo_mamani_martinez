
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Embedding, Bidirectional, LSTM, Dropout, Dense
from sklearn.model_selection import train_test_split
from tensorflow.keras.regularizers import l2
from tensorflow.keras.callbacks import EarlyStopping
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pandas as pd
import sys
import os
sys.path.append('..')
from config import MAX_LENGHT,MODEL_PATH

class ModelQuestion:
    def __init__(self, vocab_size,etiqueta_dict,tokenizer):
        self.vocab_size = vocab_size
        self.tokenizer = tokenizer
        self.etiqueta_dict = etiqueta_dict
        self.early_Stopping = None
        self.model = None
        self.load_models("thrall")
    def load_models(self, file):
        if not (os.path.exists(f'{MODEL_PATH}\{file}')):
            self.model = None
        self.model = load_model(file)
    def build_model(self):
        model = Sequential()
        model.add(Embedding(self.vocab_size, 128, input_length=MAX_LENGHT))
        model.add(Bidirectional(LSTM(128, return_sequences=True, kernel_regularizer=l2(0.01))))
        model.add(Dropout(0.5))
        model.add(Bidirectional(LSTM(128, kernel_regularizer=l2(0.01))))
        model.add(Dropout(0.5))
        model.add(Dense(len(self.etiqueta_dict), activation='softmax'))

        model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

        self.early_Stopping = EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)
        self.model = model
    def training(self, X_train, y_train, X_val, y_val, batch_size=32, epochs=10):
        if self.model is None:
            self.build_model()
        self.model.fit(X_train, y_train, epochs=100, batch_size=64, validation_data=(X_val, y_val), callbacks=[self.early_Stopping])
        self.save_model()
    def predict(self,text):
        if self.model is None:
            raise ValueError("The model must be trained first.")
        return self.model.predict(X)
    def predict(self,text):
        if self.model is None:
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
            raise ValueError("The model must be trained first.")
        self.model.save('thrall_v.h5')
