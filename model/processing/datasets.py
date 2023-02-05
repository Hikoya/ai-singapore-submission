'''
Tools to prepare the dataset and perform train-test split.
Example usage:

dataset = generate_dataset()
train_data, test_data = train_test_split(dataset)
'''

import pandas as pd
import random
import copy


def generate_dataset():
    DATASET_REVIEWS_FILE_PATH = "datasets/reviews.csv"
    
    reviews_df = pd.read_csv(DATASET_REVIEWS_FILE_PATH)
    dataset = []

    negative_threshold = lambda x: x <= reviews_df["review_rating"].quantile(0.25)
    neutral_threshold = lambda x: reviews_df["review_rating"].quantile(0.25) < x <= reviews_df["review_rating"].quantile(0.75)
    positive_threshold = lambda x: x > reviews_df["review_rating"].quantile(0.75)


    for title, desc, rating in zip(reviews_df["review_title"], reviews_df["review_desc"], reviews_df["review_rating"]):
      score = 1 if positive_threshold(rating) else 0 if neutral_threshold(rating) else -1
      dataset.append((title, desc, score))

    return dataset
        

def train_test_split(dataset, split_ratio=0.75):
    DATASET_REVIEWS_TRAIN_FILE_PATH = "datasets/reviews_train.raw"
    DATASET_REVIEWS_TEST_FILE_PATH = "datasets/reviews_test.raw"
    
    num_data = len(dataset)
    train_size = int(split_ratio * num_data)
    test_size = num_data - train_size
  
    dataset_copy = copy.deepcopy(dataset)
    random.shuffle(dataset_copy)

    train_data, test_data = dataset_copy[:train_size], dataset_copy[train_size:]
    with open(DATASET_REVIEWS_TRAIN_FILE_PATH, "w", encoding="utf8") as file:
        for title, desc, score in train_data:
            file.write(title)
            file.write("\n")
            file.write(desc)
            file.write("\n")
            file.write(str(score))
            file.write("\n")

    with open(DATASET_REVIEWS_TEST_FILE_PATH, "w", encoding="utf8") as file:
        for title, desc, score in test_data:
            file.write(title)
            file.write("\n")
            file.write(desc)
            file.write("\n")
            file.write(str(score))
            file.write("\n")
      
    return train_data, test_data
