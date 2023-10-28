import React, { useState } from "react";

const Summary = () => {
  const [leftInputValue, setLeftInputValue] = useState("");
  const [rightInputValue, setRightInputValue] = useState("");
  const [leftOutputValue, setLeftOutputValue] = useState("");
  const [rightOutputValue, setRightOutputValue] = useState("");
  return (
    <div className="summary">
      <h2>Summary Page</h2>
      <div style={{ marginRight: "20px" }}>
        <input
          type="text"
          value={leftInputValue}
          onChange={(e) => setLeftInputValue(e.target.value)}
          placeholder="Enter text for left box"
          style={{ marginBottom: "10px" }}
        />
        <button onClick={() => setLeftOutputValue(leftInputValue)}>
          Submit Left
        </button>
        <div
          style={{
            border: "1px solid black",
            width: "200px",
            height: "100px",
            marginTop: "10px",
            overflow: "auto",
          }}
        >
          {leftOutputValue}
        </div>
      </div>

      {/* Right TextBox and its Input & Button */}
      <div>
        <input
          type="text"
          value={rightInputValue}
          onChange={(e) => setRightInputValue(e.target.value)}
          placeholder="Enter text for right box"
          style={{ marginBottom: "10px" }}
        />
        <button onClick={() => setRightOutputValue(rightInputValue)}>
          Submit Right
        </button>
        <div
          style={{
            border: "1px solid black",
            width: "200px",
            height: "100px",
            marginTop: "10px",
            overflow: "auto",
          }}
        >
          {rightOutputValue}
        </div>
      </div>
    </div>
  );
};

export default Summary;
