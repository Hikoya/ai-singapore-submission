# National AI Student Challenge 2022

# Problem Statement 

Design and build a tool (app, dashboard, analysis) with AI Singapore’s AI Brick PeekingDuck (Computer Vision) 
and/or SGnlp (Natural Language Processing), that can help, assist, inform or entertain Singaporeans or businesses.

# Features

**Customer Reviews**

1. Ability to congregate customer sentiments into quantifiable measures, categorized by aspects
2. Ability to predict how positively rated a review is 

By having a well-maintained review page with above-mentioned features, the businesses allow potential customers to make better-informed and 
faster purchasing decisions by narrowing down their search and providing an at-a-glance analysis of the product/service.

# Our Approach

We used natural language processing to perform “aspect-based sentiment analysis”. 
1. We performed web-scraping on TripAdvisor's reviews page. 
2. We processed the data by tokenizing words in the reviews, and removing stop words. 
3. We used a word cloud to generate a word frequency list. For any given input, we computed the aspects for that input by selecting 
the top 5 most common aspects that were both in the input and the word frequency list. Hence, every set of products/ services will have their 
own unique aspects.
4. We then determined whether each aspect of a review is positive, negative or neutral. To do this, we used the Sentic-GCN model, 
and detected the sentiment in a given input based on the provided aspects, allowing for more fine-grained and targeted analysis.

# Try out our model and dashboard

1. Download "dashboard" and "model" repositories
2. Run "model" repository by running `python app/main.py`
3. Launch a mysql server and copy the url to a .env file (A sample .env file is given for reference, filled with dummy variables)
4. Populate the .env file with secrets eg. NEXTAUTH_SECRET , DATABASE_URL. 
5. Populate the NEXT_PUBLIC_PREDICT_URL and NEXT_PUBLIC_CLOUD_URL with the url from python backend
6. Run the dashboard by running `npm run dev`
