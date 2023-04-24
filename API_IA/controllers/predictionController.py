import sys
sys.path.append('..')
from config import MODEL_PATH
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences


def predict(text, mode, tokenizer, etiqueta_dict, model_path=None):
    if model_path is None:
        model_path = MODEL_PATH+f'/{mode}.h5'
        
    model = load_model(model_path)
    sequence = tokenizer.texts_to_sequences([text])
    sequence = pad_sequences(sequence, maxlen=150, padding='post')

    prediction = model.predict(sequence)
    predicted_label_indices = [np.argmax(pred) for pred in prediction]

    labels = {label: index for label, index in etiqueta_dict.items() if index in predicted_label_indices}
    
    full_label = " / ".join(labels.keys())

    return full_label

print("archivo "+MODEL_PATH)