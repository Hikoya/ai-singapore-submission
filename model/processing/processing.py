'''
Generates a csv file that consists of words (excluding stopwords) in the dataset,
ordered according to the frequency of the words, in descending order.
'''

import nltk
from nltk.corpus import stopwords

import utils

nltk.download("stopwords")

DATASET_WORD_CLOUD_FILE_PATH = "datasets/word_cloud.csv"

word_freq = utils.compute_word_freq()

forbidden_words = ["mcdonalds", "mcdonald", "mc", "donald", "mac", "mcdonald's"]
stopwords_to_ignore = stopwords.words("english")

mapped_word_freq = (list(map(lambda word: (word, word_freq[word]), word_freq)))
# Use naive filtering
filtered_word_freq = list(filter(
    lambda word: (word[0].lower() not in stopwords_to_ignore) and\
      (word[0].lower() not in forbidden_words) and\
      (len(word[0]) >= 2),
    mapped_word_freq)
)
sorted_filtered_word_freq = sorted(
    filtered_word_freq,
    key=lambda word: word[1],
    reverse=True
)

with open(DATASET_WORD_CLOUD_FILE_PATH, "w", encoding="utf8") as file:
  for word, freq in sorted_filtered_word_freq:
    file.write(word)
    file.write(",")
    file.write(str(freq))
    file.write("\n")
