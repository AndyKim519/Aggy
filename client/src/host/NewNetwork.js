import React, { useState } from "react";
import axios from "axios";

const NewNetwork = () => {
  const [networkName, setNetworkName] = useState("");
  const [networkDetails, setNetworkDetails] = useState("");
  const [presetQuestions, setPresetQuestions] = useState("");
  const [id, setID] = useState("");

  const handleApiRequest = async () => {
    try {
      const response = await axios.post("YOUR_API_ENDPOINT", {
        networkName,
        networkDetails,
        presetQuestions,
        id,
      });
      console.log(response.data);
      // Handle success scenario here (e.g. showing a success message)
    } catch (error) {
      console.error("Error sending data", error);
      // Handle error scenario here (e.g. showing an error message)
    }
  };

  return (
    <div>
      <h2>Create New Network</h2>
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
            value={networkDetails}
            onChange={(e) => setNetworkDetails(e.target.value)}
            placeholder="Enter Network Details"
            rows="4"
          />
        </div>
        <div>
          <input
            type="text"
            value={presetQuestions}
            onChange={(e) => setPresetQuestions(e.target.value)}
            placeholder="Enter Preset Questions"
            style={{ width: "70%" }}
          />
        </div>
        <div>
          <input
            type="text"
            value={id}
            onChange={(e) => setID(e.target.value)}
            placeholder="Network ID"
            style={{ width: "30%" }}
          />
        </div>
        <div>
          <button onClick={handleApiRequest}>Send Data</button>
        </div>
      </div>
    </div>
  );
};

export default NewNetwork;
