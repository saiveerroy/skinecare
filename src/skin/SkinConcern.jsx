// src/skin/Conxern.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./skinAssessment.css";
import { useEffect } from "react";


export default function SkinConcern() {
  const navigate = useNavigate();
  const location = useLocation();

  const { texture, skinType } = location.state || {};

  const [selectedAreas, setSelectedAreas] = useState([]);
  const [symptoms, setSymptoms] = useState("");
  const MAX_CHARS = 500;
  const [days, setDays] = useState("");

  useEffect(() => {
  if (!texture || !skinType) {
    navigate("/skin-assessment");
  }
}, [texture, skinType, navigate]);




  const toggleArea = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area)
        ? prev.filter((a) => a !== area)
        : [...prev, area]
    );
  };

  return (
    <div className="skin-container">
      {/* Header */}
      <div className="header" onClick={() => navigate(-1)}>
        ← <span>Skin Assessment</span>
      </div>

      {/* Progress */}
      <div className="progress">
        <div className="completed"></div>
        <div className="completed"></div>
        <div className="active"></div>
      </div>

      {/* Question */}
      <h2>Which body areas are affected?</h2>
      <p>Select all that apply and describe your symptoms.</p>

      {/* Body Areas */}
      <div className="option" onClick={() => toggleArea("Face")}>
        <img src="/images/face.jpg" alt="face" />
        <span>Face</span>
        <input
          type="checkbox"
          checked={selectedAreas.includes("Face")}
          readOnly
        />
      </div>

      <div className="option" onClick={() => toggleArea("Neck")}>
        <img src="/images/neck.jpg" alt="neck" />
        <span>Neck</span>
        <input
          type="checkbox"
          checked={selectedAreas.includes("Neck")}
          readOnly
        />
      </div>

      <div className="option" onClick={() => toggleArea("Arms")}>
        <img src="/images/arms.jpg" alt="arms" />
        <span>Arms</span>
        <input
          type="checkbox"
          checked={selectedAreas.includes("Arms")}
          readOnly
        />
      </div>

      <div className="option" onClick={() => toggleArea("Legs")}>
        <img src="/images/legs.jpg" alt="legs" />
        <span>Legs</span>
        <input
          type="checkbox"
          checked={selectedAreas.includes("Legs")}
          readOnly
        />
      </div>

      <div className="char-count">
        {symptoms.length} / {MAX_CHARS}
      </div>


            {/* Symptoms */}
      <textarea
        className="symptom-input"
        placeholder="Describe your symptoms (itching, redness, dryness, etc.)"
        value={symptoms}
        maxLength={MAX_CHARS}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <div className="char-count">
        {symptoms.length} / {MAX_CHARS}
      </div>

      {/* How many days */}
      <h3>How many days have you been facing this problem?</h3>
      <div className="days-options">
        {["1–7 days", "8–14 days", "15–30 days", "30+ days"].map((option) => (
          <div
            key={option}
            className={`day-option ${days === option ? "selected" : ""}`}
            onClick={() => setDays(option)}
          >
            {option}
          </div>
        ))}
      </div>




      {/* Next */}
      <button
        className="next-btn"
        disabled={selectedAreas.length === 0}
        onClick={() =>
          navigate("/skin-assessment/scan", {
            state: {
              texture,
              skinType,
              areas: selectedAreas,
              symptoms,
              duration: days,
            },
          })
        }
      >
        Generate Regime
      </button>
    </div>
  );
}
