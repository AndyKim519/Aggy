import React, { useState } from "react";
import axios from "axios";

const Summary = () => {
  const [networkID, setNetworkID] = useState("");
  const [question, setQuestion] = useState("");
  const [summary, setSummary] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(""); // for displaying an error
  const [status, serStatus] = useState("");
  const serverport = "http://127.0.0.1:5000"; // Flask server port

  const sendNetworkID = async () => {
    try {
      const response = await axios.post(serverport + "/postforsummary", {
        networkID: networkID,
      });
      setSummary(response.data); // Assuming the API returns the data you want to display
      serStatus(networkID);
      setError(""); // clear any previous error
    } catch (error) {
      console.error(
        "There was an error sending the summary API request",
        error
      );
      setError("Failed to retrieve summary. Please try again.");
      // Handle error accordingly
    }
  };

  const sendQuestion = async () => {
    try {
      const response = await axios.post(serverport + "/postforquestion", {
        networkID: networkID,
        question: question,
      });
      setAnswer(response.data); // Assuming the API returns the data you want to display
      setQuestion(""); // reset input
      setError(""); // clear any previous error
    } catch (error) {
      console.error(
        "There was an error sending the question/answer API request",
        error
      );
      setError("Failed to retrieve the answer. Please try again.");
      // Handle error accordingly
    }
  };

  return (
    <div>
      <h1>Summary: {status}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error if it exists */}
      <div className="summary">
        <div className="response">
          <input
            type="text"
            value={networkID}
            onChange={(e) => setNetworkID(e.target.value)}
            placeholder="Network ID #"
            style={{ marginBottom: "10px" }}
          />
          <button onClick={sendNetworkID}>Enter</button>
          <div className="outputbox">{summary}</div>
        </div>

        <div className="response">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Specific questions?"
            style={{ marginBottom: "10px" }}
          />
          <button onClick={sendQuestion}>Enter</button>
          <div className="outputbox">{answer}</div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
