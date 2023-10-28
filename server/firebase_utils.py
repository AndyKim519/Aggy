import firebase_admin
from firebase_admin import credentials, firestore
from logic import generate_unique_network_id, validityCheck

cred = credentials.Certificate('FirebaseKeys.json')
firebase_admin.initialize_app(cred)

db = firestore.client()


def newNetwork(networkName, networkDetails, presetQuestions):
    newID = generate_unique_network_id(db)
    new_network_data = {
            "aggregatedText": "",
            "approvedTexts": [""],
            "networkDetails": networkDetails,
            "networkName": networkName,
            "presetQuestions": presetQuestions,
            "rejectedTexts": [""],
            "userTexts": [""]
        }
    doc_ref = db.collection("Networks").document(newID)
    doc_ref.set(new_network_data)
    return networkDetails

def userInput(networkID, text):
    doc_ref = db.collection("Networks").document(networkID)
    doc_ref.update({
        'userTexts': firestore.ArrayUnion([text])
    })
    return networkID

def checkTextsValidity(networkID):
    doc_ref = db.collection("Networks").document(networkID)
    texts = doc_ref.to_dict()["userTexts"]
    isValid = validityCheck(networkID, texts)
    for i in range(len(texts)):
        if isValid[i]:
            doc_ref.update({
            'apporovedTexts': firestore.ArrayUnion([texts[i]])
            })
        else:
            doc_ref.update({
            'rejectedTexts': firestore.ArrayUnion([texts[i]])
            })

        
def getInterviews(networkID):
    network = db.collection("Networks").document(networkID).get()
    network = network.to_dict()
    return network["approvedTexts"]


def getHostNetworks(hostID):
    doc_ref = db.collection("Hosts").document(hostID)
    networkIDS = doc_ref.to_dict()["networkIDS"]
    return networkIDS

def addHost(hostID):
    doc_ref = db.collection("Hosts").document(hostID)
    newHostData = {
        "networkIDS" : [""],
        }
    doc_ref.set(newHostData)
    return hostID

def addNetworkID(hostID, networkID):
    doc_ref = db.collection("Hosts").document(hostID)
    doc_ref.update({
        'networkIDS': firestore.ArrayUnion([networkID])
    })
    return networkID




