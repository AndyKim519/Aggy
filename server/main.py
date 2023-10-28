from flask import Flask
from firebase_utils import newNetwork
from views import app_views

app = Flask(__name__)


@app.route('/')
def index():

    newNetwork(networkName="A", networkDetails="B", presetQuestions="C")
    
    return ":D"


if __name__ == '__main__':
    app.run(debug=True)
