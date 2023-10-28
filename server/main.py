from flask import Flask
from firebase_utils import newNetwork
from views import app_views

app = Flask(__name__)


@app.route('/')
def index():
    return "ROOT"


if __name__ == '__main__':
    app.run(debug=True)
