import React, { useState } from "react";
import Visualization from "./visualization";
import "./App.css";

function App() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [vizUrl, setVizUrl] = useState("");

  const handleGenerate = async () => {
    try {
      const response = await fetch("http://localhost:5000/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const data = await response.json();
      console.log("API response:", data);
      if (data.vizUrl) {
        setVizUrl(data.vizUrl);
      } else {
        alert("Error generating visualization.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to backend.");
    }
  };

  return (
    <div className="App">
      <h1>Visualization Generator</h1>
      <div className="content-wrapper">
        <div className="form-section">
          <label>
            Select Language:
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="python">Python</option>
              <option value="r">R</option>
            </select>
          </label>
          <br />
          <label>
            Visualization Script:
            <textarea
              rows="10"
              cols="60"
              placeholder="Enter your visualization script here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            ></textarea>
          </label>
          <br />
          <button onClick={handleGenerate}>Generate</button>
        </div>
        {vizUrl && (
          <div className="viz-section">
            <Visualization vizUrl={vizUrl} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
