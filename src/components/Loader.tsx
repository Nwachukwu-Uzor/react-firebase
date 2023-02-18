import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <aside className="loader-container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </aside>
  );
};

export default Loader;
