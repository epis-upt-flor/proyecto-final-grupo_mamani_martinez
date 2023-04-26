import sys
sys.path.append('..')
from utils import treatment
from models import ModelQuestion

def predictModel(text):
    
    X_train, y_train, X_val, y_val, vocab_size, etiqueta_dict, tokenizer = treatment('data')
    question = ModelQuestion(vocab_size,etiqueta_dict,tokenizer,'thrall_v')
    label=question.predict(text)
    return (f"Etiqueta : {label}")

