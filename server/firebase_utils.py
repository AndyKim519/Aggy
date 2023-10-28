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

def userInput(networkID, text):
    doc_ref = db.collection("Networks").document(networkID)
    doc_ref.update({
        'userTexts': firestore.ArrayUnion([text])
    })
    if validityCheck(networkID, text):
        doc_ref.update({
        'apporovedTexts': firestore.ArrayUnion([text])
    })
    else:
        doc_ref.update({
        'rejectedTexts': firestore.ArrayUnion([text])
    })
        
def getInterviews(networkID):
    return


