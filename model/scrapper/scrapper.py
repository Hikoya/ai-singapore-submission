'''
Scraps the TripAdvisor reviews page for McDonald's and saves it to a csv file.

@sharmaine1028
'''

from tqdm import tqdm
import pandas as pd
import csv

import utils


DATASET_REVIEWS_FILE_PATH = "datasets/reviews.csv"

base_url = "https://www.tripadvisor.com.sg/Restaurant_Review-g294265-d805881-Reviews-McDonald_s-Singapore.html"

review_df = pd.DataFrame(columns=["visit_date", "review_title", "review_desc", "review_rating"])

visit_dates = []
review_titles = []
review_descs = []
review_ratings = []

list_of_urls = [base_url]
no_of_pages = utils.get_page_num(base_url)

for i in range(1, no_of_pages):
    url = f"https://www.tripadvisor.com.sg/Restaurant_Review-g294265-d805881-Reviews-or{i * 15}-McDonald_s-Singapore.html"
    list_of_urls.append(url)

for url in tqdm(list_of_urls):
  batched_visit_dates, batched_review_titles, batched_review_descs, batched_review_ratings = utils.parse_search_page(url)
  visit_dates.extend(batched_visit_dates)
  review_titles.extend(batched_review_titles)
  review_descs.extend(batched_review_descs)
  review_ratings.extend(batched_review_ratings)

review_df["visit_date"] = visit_dates
review_df["review_title"] = review_titles
review_df["review_desc"] = review_descs
review_df["review_rating"] = review_ratings

review_df.to_csv(DATASET_REVIEWS_FILE_PATH, index=False, header=True)
