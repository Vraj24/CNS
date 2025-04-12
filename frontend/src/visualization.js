import React from "react";

function Visualization({ vizUrl }) {
  const extension = vizUrl?.split(".").pop();

  return (
    <div className="viz-container">
      {extension === "html" ? (
        <iframe src={vizUrl} title="Visualization" width="800" height="600" />
      ) : (
        <img src={vizUrl} alt="Generated visualization" />
      )}
    </div>
  );
}

export default Visualization;
