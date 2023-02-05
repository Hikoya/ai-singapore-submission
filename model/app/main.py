from flask import Flask, request
from flask_cors import CORS

import utils
from model import Model

app = Flask(__name__)
CORS(app)

# It's really slow.
@app.before_first_request
def setup():
    Model.setup()


@app.route("/", methods=["GET"])
def index():
    return "Hello"
    
@app.route("/cloud", methods=["GET"])
def cloud():
    return utils.return_aspects()

@app.route("/predict", methods=["POST"])
def predict():
    review_title, review_desc = request.json.get("review_title"), request.json.get("review_desc")

    aspects = utils.compute_aspects(review_title, review_desc)

    outputs = Model.predict(aspects, review_title + " " + review_desc)
    outputs.append({"aspect_name": aspects})

    return outputs


app.run(host="0.0.0.0", port=81, debug=True)
#app.run()