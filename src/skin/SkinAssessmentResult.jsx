import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./skinAssessment.css";

export default function SkinAssessmentResult() {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    image,
    texture,
    skinType,
    areas,
    symptoms,
    duration,
    result,
  } = location.state || {};

  if (!result) {
    return (
      <div className="skin-container">
        <h2>No analysis found</h2>
        <button
          className="next-btn"
          onClick={() => navigate("/skin-assessment")}
        >
          Start New Scan
        </button>
      </div>
    );
  }

  // Fake AI score for UI
  const skinScore = Math.floor(Math.random() * 30) + 70;

  const confidence = Math.floor(Math.random() * 20) + 80;

  const severity =
    result?.conditions?.length > 2
      ? "High"
      : result?.conditions?.length === 2
      ? "Medium"
      : "Low";

  return (
    <div className="skin-container">

      <div className="header" onClick={() => navigate(-1)}>
        ← <span>Back</span>
      </div>

      <h2>AI Skin Analysis</h2>

      {/* Image */}
      {image && (
        <div className="preview">
          <img src={image} alt="Skin Scan" />
        </div>
      )}

      {/* Skin Score */}
      <div className="result-card score-card">
        <h3>Skin Health Score</h3>

        <div className="score-circle">
          {skinScore}
        </div>

        <p>AI Confidence: {confidence}%</p>
      </div>

      {/* Detected Issues */}
      <div className="result-card">

        <h3>Detected Conditions</h3>

        {result?.conditions?.length ? (
          <ul>
            {result.conditions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>No major skin issues detected.</p>
        )}

        <p>
          <strong>Severity:</strong> {severity}
        </p>

      </div>

      {/* Skin Details */}
      <div className="result-card">

        <h3>Your Skin Profile</h3>

        <p><strong>Skin Type:</strong> {skinType}</p>

        <p><strong>Texture:</strong> {texture}</p>

        <p>
          <strong>Areas:</strong>{" "}
          {Array.isArray(areas) ? areas.join(", ") : areas}
        </p>

        <p>
          <strong>Symptoms:</strong>{" "}
          {Array.isArray(symptoms)
            ? symptoms.join(", ")
            : symptoms || "None"}
        </p>

        <p><strong>Duration:</strong> {duration || "Unknown"}</p>

      </div>

      {/* Recommended Routine */}
      <div className="result-card">

        <h3>Recommended Skincare Routine</h3>

        <ul>
          <li>Gentle Face Cleanser (Morning & Night)</li>
          <li>Niacinamide Serum</li>
          <li>Moisturizer for your skin type</li>
          <li>Sunscreen SPF 50 daily</li>
        </ul>

      </div>

      {/* Actions */}
      <div className="result-actions">

        <button
          className="next-btn"
          onClick={() => navigate("/skin-history")}
        >
          View History
        </button>

        <button
          className="next-btn"
          onClick={() => navigate("/skin-assessment")}
        >
          New Scan
        </button>

        <button
          className="next-btn"
          onClick={() => navigate("/home")}
        >
          Home
        </button>

      </div>

    </div>
  );
}