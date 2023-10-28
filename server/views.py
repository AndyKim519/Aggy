from flask import Blueprint, request, jsonify
from flask import current_app as app
from firebase_utils import newNetwork

app_views = Blueprint('app_views', __name__)

@app_views.route('/createnetwork', methods=['POST'])
def createNetwork():
    req_data = request.get_json()
    networkName = req_data.get('networkName')
    networkDetails = req_data.get('networkDetails')
    presetQuestions = req_data.get('presetQuestions')
    newNetwork(networkName=networkName, networkDetails=networkDetails, presetQuestions=presetQuestions)

@app_views.route('/postaudio', methods=['POST'])
def postAudio():
    req_data = request.get_json()
    audio_file = req_data.get('audio')
    return

@app_views.route('/postforsummary', methods=['POST'])
def postForSummary():
    req_data = request.get_json()
    networkID = req_data.get('networkID')
    return

@app.views.route('/postforquestion', methods=['POST'])
def postForQuestion():
    req_data = request.get_json()
    networkID = req_data.get('networkID')
    question = req_data.get('question')
    return



