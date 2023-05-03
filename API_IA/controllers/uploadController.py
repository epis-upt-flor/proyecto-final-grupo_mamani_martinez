import sys
sys.path.append('..')
from utils import treatment

class upload(object):
    @staticmethod
    def uploadQuestion(file):
        X_train, y_train, X_val, y_val, vocab_size, etiqueta_dict, tokenizer = treatment(file)
        return X_train, y_train, X_val, y_val
    @staticmethod
    def uploadProduct(file):
        X_train, y_train, X_val, y_val, vocab_size, etiqueta_dict, tokenizer = treatment(file)
        return X_train, y_train, X_val, y_val