# Set up the development environment

1. Install the required packages
  - `pip install -r requirements.txt`
  - You can set up a virtual environment with `venv` if you like.
2. Run the app
  - `python3 app/main.py`
3. Test a sample post request
  - `curl -XPOST -H "Content-type: application/json" -d '{"review_title": "Very awesome burger", "review_desc": "I like burgers a lot"}' 'http://127.0.0.1:81/predict'`
