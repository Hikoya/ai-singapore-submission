from bs4 import BeautifulSoup
import requests


def get_page_num(base_url):
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; CrOS x86_64 12871.102.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"
    }
    page = requests.get(base_url, headers=headers)
    soup = BeautifulSoup(page.text, 'html.parser')

    return int(soup.find_all("a", {"class" : "pageNum"})[-1].get_text())


def parse_search_page(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; CrOS x86_64 12871.102.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.141 Safari/537.36"
    }
    page = requests.get(url, headers=headers)
    soup = BeautifulSoup(page.text, 'html.parser')
    
    visit_dates = []
    review_titles = []
    review_descs = []
    review_ratings = []
    
    # Getting review data
    all_reviews = soup.find_all("div", {'class': 'reviewSelector'})
    for review in all_reviews:
        # Getting date of visit
        visit_date = review.find("span", {'class' : 'ratingDate'})['title']

        # Getting title of review
        review_title = review.find("span", {'class' : "noQuotes"}).text

        # Getting desc of review
        review_desc = review.find("p", {'class' : 'partial_entry'}).text

        # Getting the overall rating
        review_rating = int(review.find("span", { 'class': 'ui_bubble_rating' })['class'][-1].replace("bubble_", ""))

        # Getting rid of "More" in desc of review
        if review.find("span", {'class': 'postSnippet'}):
          review_desc = review_desc[:-4]
      
        visit_dates.append(visit_date)
        review_titles.append(review_title)
        review_descs.append(review_desc)
        review_ratings.append(review_rating)
    
    return visit_dates, review_titles, review_descs, review_ratings
