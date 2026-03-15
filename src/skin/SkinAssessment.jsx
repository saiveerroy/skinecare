// src/skin/SkinAssessment.jsx
import React, { useState } from "react";
import "./skinAssessment.css";
import { useNavigate } from "react-router-dom";




export default function SkinAssessment() {
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();


  return (
    <div className="skin-container">
      {/* Header */}
      <div className="header" onClick={() => navigate("/home")}>
        ← <span>Skin Assessment</span>
      </div>


      

      {/* Question */}
      <h2>What is your skin texture?</h2>
      <p>This helps us know the moisture content in your skin.</p>

      {/* Options */}
      <div className="option" onClick={() => setSelected("Oily")}>
        <img src="/images/oily.jpg" alt="oily" />
        <span>Oily</span>
        <input type="radio" checked={selected === "Oily"} readOnly />
      </div>

      <div className="option" onClick={() => setSelected("Dry")}>
        <img src="/images/dry.jpg" alt="dry" />
        <span>Dry</span>
        <input type="radio" checked={selected === "Dry"} readOnly />
      </div>

      <div className="option" onClick={() => setSelected("Combination")}>
        <img src="/images/combination.jpg" alt="combination" />
        <span>Combination</span>
        <input type="radio" checked={selected === "Combination"} readOnly />
      </div>

      {/* Next Button */}
      <button
        className="next-btn" disabled={!selected} onClick={() => navigate("/skin-assessment/type", {
            state: { texture: selected },
          })
        }
      >
        Next
      </button>
    </div>
  );
}
