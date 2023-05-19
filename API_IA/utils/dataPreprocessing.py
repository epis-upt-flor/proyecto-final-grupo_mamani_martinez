import pandas as pd
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.utils import to_categorical
from transformers import TFBertModel, BertTokenizer
from sklearn.model_selection import train_test_split
import sys
sys.path.append('..')
from config import MAX_LENGHT,DATA_PATH

def combine_labels(row):
    labels = [str(row['Idioma']),str(row['Etiqueta']), str(row['SubEtiqueta1']), str(row['SubEtiqueta2']), str(row['SubEtiqueta3'])]
    combined_labels = ' / '.join(filter(lambda x: x not in ['nan', ''], labels))
    return combined_labels
def treatment(file,tokenizer):

    columns = ['Frase', 'Idioma', 'Etiqueta', 'SubEtiqueta1', 'SubEtiqueta2', 'SubEtiqueta3']
    df = pd.read_excel(DATA_PATH+f'/{file}.xlsx', usecols=columns, engine='openpyxl')
    df['all_labels'] = df.apply(combine_labels, axis=1)

    etiqueta_dict = {label: index for index, label in enumerate(df['all_labels'].unique())}

    df_train, df_val = train_test_split(df, test_size=0.2, random_state=42)

    train_encodings = tokenizer(df_train['Frase'].tolist(), truncation=True, padding='max_length', max_length=MAX_LENGHT, return_tensors='tf')
    val_encodings = tokenizer(df_val['Frase'].tolist(), truncation=True, padding='max_length', max_length=MAX_LENGHT, return_tensors='tf')

    y_train = df_train['all_labels'].apply(lambda x: etiqueta_dict[x])
    y_train = to_categorical(y_train)

    y_val = df_val['all_labels'].apply(lambda x: etiqueta_dict[x])
    y_val = to_categorical(y_val)

    return train_encodings, y_train, val_encodings, y_val, etiqueta_dict