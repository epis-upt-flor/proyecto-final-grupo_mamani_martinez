import spacy
from num2words import num2words
import nltk
from nltk.tokenize import word_tokenize
from nltk.tag import pos_tag

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

import sys
sys.path.append('..')
from config import MODEL_PATH


class ModelNER:
    def __init__(self, name = "model_ner_best"):
        self.name = name
        self.load()
    def load(self):
        self.nlp = spacy.load(MODEL_PATH+"/"+self.name)

    def predict(self,test_text):
        doc = self.nlp(test_text)

        orders = []

        order = {"NAME":None,"EXTRA":None,"QUANTITY":0,"AVAILABLE":False,"CANCEL":False}
        for ent in doc.ents:

            if (ent.label_ not in ("DISH" ,"QUANTITY")):
                order[ent.label_] = False if ent.text is None else True

            elif (ent.label_ == "QUANTITY"):
                try:
                    wordNumber = self.word_to_number(ent.text)
                    number = wordNumber if wordNumber else int(ent.text)
                except:
                    order["QUANTITY"] = 1 if (((ent.text).lower()) in ("una","un")) else 0
                else:
                    order["QUANTITY"] = number


            elif (ent.label_ == "EXTRA"):
                order["EXTRA"] = order["EXTRA"] + " "+ent.text
            else:

                order["AVAILABLE"] = order["QUANTITY"] == 0
                dish_filter = self.filterText(ent.text)

                existing_order = next((item for item in orders if item["NAME"] == dish_filter), None)
                if existing_order:
                    existing_order["QUANTITY"] += 1 if order["QUANTITY"] == 0 else order["QUANTITY"]
                else:
                    order["NAME"] = dish_filter
                    orders.append(order.copy())
                    order = {"NAME":None,"EXTRA":None,"QUANTITY":0,"AVAILABLE":False,"CANCEL":False}

        return orders
    @staticmethod
    def filterText(sentence):
        tokens = word_tokenize(sentence)
        pos_tags = pos_tag(tokens)

        filtered_tokens = [token for token, pos in pos_tags if pos != "DT" and token.lower() != "y"]
        filtered_sentence = " ".join(filtered_tokens)
        return filtered_sentence

    @staticmethod
    def word_to_number(word):
        try:
            return {num2words(i, lang='es'): i for i in range(1, 1001)}[word]
        except KeyError:
            return None