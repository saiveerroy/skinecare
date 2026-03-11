// src/skin/SkinType.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./skinAssessment.css";
import { useEffect } from "react";

export default function SkinType() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("");

  const texture = location.state?.texture; // from step 1

  useEffect(() => {
  if (!texture) {
    navigate("/skin-assessment");
  }
}, [texture, navigate]);


  return (
    <div className="skin-container">
      {/* Header */}
      <div className="header" onClick={() => navigate(-1)}>
        ← <span>Skin Assessment</span>
      </div>

      {/* Progress */}
      <div className="progress">
        <div className="completed"></div>
        <div className="active"></div>
        <div></div>
      </div>

      {/* Question */}
      <h2>What is your skin type?</h2>
      <p>This helps us with the right ingredients for your skin.</p>

      {/* Option: Normal */}
      <div className="option" onClick={() => setSelected("Normal")}>
        <img src="/images/normal.jpg" alt="normal skin" />
        <span>Normal</span>
        <input type="radio" checked={selected === "Normal"} readOnly />
      </div>

      {/* Option: Sensitive */}
      <div className="option" onClick={() => setSelected("Sensitive")}>
        <img src="/images/sensitive.jpg" alt="sensitive skin" />
        <span>Sensitive</span>
        <input type="radio" checked={selected === "Sensitive"} readOnly />
      </div>

      {/* Next */}
      <button
        className="next-btn"
        disabled={!selected}
        onClick={() =>
          navigate("/skin-assessment/concerns", {
            state: {
              texture,
              skinType: selected,
            },
          })
        }
      >
        Next
      </button>
    </div>
  );
}
