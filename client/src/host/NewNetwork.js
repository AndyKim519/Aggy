import React, { useState } from "react";
import axios from "axios";

const NewNetwork = () => {
  const [networkName, setNetworkName] = useState("");
  const [networkDetails, setNetworkDetails] = useState("");
  const [presetQuestions, setPresetQuestions] = useState("");
  const [id, setID] = useState("");
  const serverport = "http://127.0.0.1:5000"; // Flask server port

  const handleApiRequest = async () => {
    try {
      const response = await axios.post(serverport + "/createnetwork", {
        networkName: networkName,
        networkDetails: networkDetails,
        presetQuestions: presetQuestions,
      });
      console.log(response.data);
      setID(response.data);
      // Handle success scenario here (e.g. showing a success message)
    } catch (error) {
      console.error("Error sending data", error);
      // Handle error scenario here (e.g. showing an error message)
    }
  };

  return (
    <div>
      <h1>Create New Network</h1>
      <div className="newnetwork">
        <div>
          <input
            type="text"
            value={networkName}
            onChange={(e) => setNetworkName(e.target.value)}
            placeholder="Enter Network Name"
          />
        </div>
        <div>
          <textarea
            className="big-input"
            value={networkDetails}
            onChange={(e) => setNetworkDetails(e.target.value)}
            placeholder="Enter Network Details"
            rows="4"
          />
        </div>
        <div>
          <textarea
            className="big-input"
            value={presetQuestions}
            onChange={(e) => setPresetQuestions(e.target.value)}
            placeholder="Enter Preset Questions"
            rows="4"
          />
        </div>
        <div>
          Network id: <div className="smalloutputbox">{id}</div>
        </div>
        <div>
          <button onClick={handleApiRequest}>Send Data</button>
        </div>
      </div>
    </div>
  );
};

export default NewNetwork;
