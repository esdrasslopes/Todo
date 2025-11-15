import React from "react";
import "./Loading.css";

const Loading: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
