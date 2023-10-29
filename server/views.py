from flask import Blueprint, request, jsonify
from flask import current_app as app
from firebase_utils import *
from logic import *

app_views = Blueprint('app_views', __name__)


@app_views.route('/createnetwork', methods=['POST'])
def createNetwork():
    req_data = request.get_json()
    networkName = req_data.get('networkName')
    networkDetails = req_data.get('networkDetails')
    presetQuestions = req_data.get('presetQuestions')
    newID = newNetwork(networkName=networkName, networkDetails=networkDetails,
               presetQuestions=presetQuestions)
    return newID


@app_views.route('/postaudio', methods=['POST'])
def postAudio():
    req_data = request.get_json()
    networkID = req_data.get('networkID')
    audio_file = req_data.get('text')
    convertedText = handleInterview(audio_file)
    userInput(networkID, convertedText)
    return networkID


@app_views.route('/postforsummary', methods=['POST'])
def postForSummary():
    req_data = request.get_json()
    networkID = req_data.get('networkID')
    validityCheck(networkID=networkID, interviews=getInterviews(networkID), event=getEvent(networkID))
    summary = handleSummary(networkID, getEvent(networkID), getApprovedTexts(networkID))
    return summary


@app_views.route('/postforquestion', methods=['POST'])
def postForQuestion():
    req_data = request.get_json()
    networkID = req_data.get('networkID')
    question = req_data.get('question')
    response = handleQuestion(networkID, question, getEvent(networkID))
    return response
