import string
import random

def generate_unique_network_id(db):
    length_of_id = 5
    possible_characters = string.ascii_letters + string.digits

    unique_id_found = False
    while not unique_id_found:
        network_id = ''.join(random.choice(possible_characters) for _ in range(length_of_id))

        doc_ref = db.collection("Networks").document(network_id)

        if not doc_ref.get().exists:
            unique_id_found = True
            doc_ref.set({'placeholder_value': True})  # We're not storing data under this ID, so the field is a placeholder.
            
    return network_id

def validityCheck(networkID, interviews):
    results = []
    for interview in interviews:
        results.append(True)
    return results
