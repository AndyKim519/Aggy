from flask import Flask
from flask_cors import CORS
from firebase_utils import newNetwork
from views import app_views

app = Flask(__name__)
CORS(app)

app.register_blueprint(app_views)


@app.route('/')
def index():
    return "ROOT"


if __name__ == '__main__':
    app.run(debug=True)
