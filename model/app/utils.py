import csv

def return_aspects():
    
    DATASET_WORD_CLOUD_FILE_PATH = "datasets/word_cloud.csv"

    word_clouds = []
    with open(DATASET_WORD_CLOUD_FILE_PATH, newline="", encoding="utf8") as file:
        data = csv.reader(file, delimiter=',')
        for word, freq in data:
            word_clouds.append((word, int(freq)))

    return word_clouds

def compute_aspects(title, desc):
    # We do not want to pick words that are too rare in our aspects
    COMMONALITY_THRESHOLD = 2
    MAX_NUM_ASPECTS = 5

    DATASET_WORD_CLOUD_FILE_PATH = "datasets/word_cloud.csv"

    word_clouds = []
    with open(DATASET_WORD_CLOUD_FILE_PATH, newline="", encoding="utf8") as file:
        data = csv.reader(file, delimiter=',')
        for word, freq in data:
            word_clouds.append((word, int(freq)))

    sentence = title + " " + desc
    aspects = list(filter(
        # Make sure the aspect is in the sentence
        lambda word: (word[0] in sentence) and\
            # Make sure the aspect is not too rare
            word[1] > COMMONALITY_THRESHOLD and\
            # Make sure the aspect is not just one word/digit
            len(word[0]) >= 2,
        word_clouds
    ))

    aspects = list(map(lambda word: word[0], aspects))

    return aspects
