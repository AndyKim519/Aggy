from flask import Flask
from flask_cors import CORS
from firebase_utils import newNetwork
from views import app_views
from logic import *

app = Flask(__name__)
CORS(app)

app.register_blueprint(app_views)


@app.route('/')
def index():
    news = ["Global Tech Giant Enters Automotive Industry: Today marks a historic shift as NextGenTech, renowned for cutting-edge consumer electronics, officially announces its venture into the automotive sector. Launching its inaugural electric vehicle (EV), the 'Electron,' NextGenTech promises revolutionary battery technology with record-breaking autonomy. Industry experts forecast a disruptive wave as Electron offers groundbreaking artificial intelligence integration, catering to heightened safety, personalized in-transit experience, and advanced autonomous driving features. Amidst growing environmental concerns, NextGenTech's entry signifies a monumental step towards sustainable transportation, leveraging its tech prowess to redefine automotive standards globally.", 
            "Breakthrough in Renewable Energy Storage Solutions: In a major breakthrough, scientists at GreenFuture Innovations have developed a novel energy storage system, significantly enhancing renewable energy capabilities. This cutting-edge solution addresses inefficiencies of current models, enabling ultra-high-capacity storage and rapid, efficient energy discharge. It promises a transformation in harnessing solar and wind power, mitigating renewable energy's intermittent nature. Global leaders commend this innovation, recognizing its potential in accelerating the transition to green energy. Environmental agencies predict a substantial reduction in carbon footprint, advocating for immediate adoption and investment in this game-changing technology, pivotal for global sustainable practices.",
            "Historic Peace Treaty Ends Decades-Long Conflict: A landmark agreement has been reached as rival nations Aurentia and Belvograd sign an extensive peace treaty, drawing a decades-long conflict to a close. The international community celebrates this diplomatic triumph, achieved through several rounds of rigorous negotiations, highlighting the pivotal role of neutral countries and organizations in mediation. The treaty details include territory boundaries, reparations, and disarmament terms, alongside initiatives promoting cultural exchange and economic collaboration. Analysts anticipate regional stability, encouraging foreign investment, and foresee a domino effect, inspiring peacekeeping efforts globally. Leaders worldwide commend Aurentia and Belvograd, setting a precedent in conflict resolution.",
            "Revolution in Global Healthcare Through AI: The world witnesses a healthcare transformation with AI Health Solutions unveiling its advanced medical AI, 'DocSynth.' This revolutionary system offers accurate diagnostics, personalized treatment planning, and potential drug formulations, challenging traditional healthcare paradigms. 'DocSynth' employs deep learning to analyze vast patient data, achieving remarkable precision that outperforms human practitioners, minimizing human error, and significantly reducing diagnosis times. Healthcare professionals advocate for its integration, emphasizing improved patient outcomes and resource optimization in medical facilities worldwide. The innovation marks a significant stride in medical technology, potentially reshaping global healthcare standards and accessibility."]
    event = "Tech companies coming out with new discoveries for world peace"
    build_llm(0, news)

    output = handleQuestion(0, "Who developed a new novel energy system?", event)

    return output


if __name__ == '__main__':
    app.run(debug=True)
