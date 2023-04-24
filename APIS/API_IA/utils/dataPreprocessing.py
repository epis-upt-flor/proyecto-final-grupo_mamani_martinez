import sys
sys.path.append('..')
from config import DATA_PATH , MAX_LENGHT
import pandas as pd
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.utils import to_categorical
from sklearn.model_selection import train_test_split

def combine_labels(row):
    labels = [str(row['Idioma']),str(row['Etiqueta']), str(row['SubEtiqueta1']), str(row['SubEtiqueta2']), str(row['SubEtiqueta3'])]
    combined_labels = ' / '.join(filter(lambda x: x not in ['nan', ''], labels))
    return combined_labels

def treatment(file):
    columns = ['Frase', 'Idioma', 'Etiqueta', 'SubEtiqueta1', 'SubEtiqueta2', 'SubEtiqueta3']
    df = pd.read_excel(DATA_PATH+f'/{file}.xlsx', usecols=columns, engine='openpyxl')
    df['all_labels'] = df.apply(combine_labels, axis=1)

    etiqueta_dict = {label: index for index, label in enumerate(df['all_labels'].unique())}

    df_train, df_val = train_test_split(df, test_size=0.2, random_state=42)

    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(df_train['Frase'])

    max_length = MAX_LENGHT
    vocab_size = len(tokenizer.word_index) + 1

    X_train = tokenizer.texts_to_sequences(df_train['Frase'])
    X_train = pad_sequences(X_train, maxlen=max_length, padding='post')

    X_val = tokenizer.texts_to_sequences(df_val['Frase'])
    X_val = pad_sequences(X_val, maxlen=max_length, padding='post')

    y_train = df_train['all_labels'].apply(lambda x: etiqueta_dict[x])
    y_train = to_categorical(y_train)

    y_val = df_val['all_labels'].apply(lambda x: etiqueta_dict[x])
    y_val = to_categorical(y_val)

    return X_train, y_train, X_val, y_val, vocab_size, etiqueta_dict, tokenizer

