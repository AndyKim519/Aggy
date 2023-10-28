import string
import random
import time
import openai
from environs import URLField
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Zilliz
from os import environ
from pymilvus import MilvusClient
from pymilvus.orm import partition
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import WebBaseLoader
from langchain.chains.qa_with_sources import load_qa_with_sources_chain
from langchain.schema.document import Document
from langchain.llms import OpenAI
import json
from flask import current_app
import together


docs = []


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

def validityCheck(networkID, interviews, event):
    prompt_start = "Question: Given the event: "
    prompt_end = "' a valid, relevant, and appropriate account. If it is, only restate the response, if not, simply respond 'no'. Answer: "

    results = []
    for interview in interviews:
        time.sleep(1)
        output = together.Complete.create(
            prompt = prompt_start + event + " is " + interview + prompt_end,
            model = "togethercomputer/llama-2-70b-chat",
            max_tokens = 1024,
            temperature = 0.1,
        )
        print(output['output']['choices'][0]['text'])
        results.append('Yes' in output['output']['choices'][0]['text'].split()[0])
    return results

def handleAudio(audio):
    audio_file= open(audio, "rb")
    transcript = openai.Audio.translate("whisper-1", audio_file, response_format="text")
    return transcript


def build_llm(networkID, validated_data):
    with open('config.json') as config_file:
        config = json.load(config_file)

    embeddings = OpenAIEmbeddings(openai_api_key=config["OPENAI_API_KEY"])

    total_splitted = []
    person_num = 0
    for answer in validated_data:
        doc = [Document(page_content=answer, metadata={"source": "local"})]
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, length_function = len, add_start_index = True,)
        splitted = text_splitter.split_documents(doc)
        for chunk in splitted:
            chunk.page_content = "Person " + str(person_num) + ": " + chunk.page_content
        person_num+=1
        total_splitted = total_splitted + splitted 

    Zilliz.from_documents(
        total_splitted,
        embedding=embeddings,
        #collection_name = networkID,
        connection_args={"uri": config["URI"], "token": config["ZILLIZ_API_KEY"], "secure": True}
    )
    global docs
    docs = total_splitted




def handleSummary(networkID, event):
    summary = handleQuestion(networkID, "Provide a summary of the event.", event)
    return summary

def handleQuestion(networkID, query, event):
    with open('config.json') as config_file:
        config = json.load(config_file)

    environ['OPENAI_API_KEY'] = config['OPENAI_API_KEY']

    chain = load_qa_with_sources_chain(OpenAI(temperature=0.1), chain_type="map_reduce", return_intermediate_steps=True)
    query = "Summarize the event"
    prompt = "You are an assistant to a news outlet attempting to report on" +  event + ". People were interviewed for their perspectives, and you have been chosen to express the views of all of them. Try to provide trends you see across multiple people but provide specific information when necessary if relevant. The question you have been asked is" + query + "Each response starts with a “Person #: “ indicating the person who responded, and responses with the same Person # were said by the same person. Ensure you only reflect the interviewees' responses and not your own judgement. Answer the question to the best of your ability to reflect the people interviewed."

    global docs
    response = chain({"input_documents": docs, "question": prompt}, return_only_outputs=True)['output_text']
    return response
