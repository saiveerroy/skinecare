// src/skin/SkinAssessmentResult.jsx
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SkinAssessmentResult() {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!result.heatmap) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    result.heatmap.forEach(point => {
      const gradient = ctx.createRadialGradient(
        point.x, point.y, 5,
        point.x, point.y, point.r
      );

      gradient.addColorStop(0, "rgba(255,0,0,0.6)");
      gradient.addColorStop(1, "rgba(255,0,0,0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      ctx.fill();
    });

  }, [result]);

  const [acneProgress, setAcneProgress] = useState([]);

    useEffect(() => {
      const history =
        JSON.parse(localStorage.getItem("skinHistory")) || [];

      const progress = history
        .filter(item => item.result.primary_condition === result.primary_condition)
        .map(item => ({
          date: item.date,
          confidence: item.result.confidence
        }));

      setAcneProgress(progress);
    }, []);
    

    
  
  

  if (!state?.result) {
    return (
      <div style={styles.container}>
        <h2 style={styles.h2}>No Result Found</h2>
        <button style={styles.button} onClick={() => navigate("/skin-assessment")}>
          Go Back
        </button>
      </div>
    );
  }

  const { image, result } = state;
  const {
    primary_condition,
    confidence,
    possible_conditions = [],
    observations = [],
    recommendation,
    medical_disclaimer,
  } = result;

  const recommendedProducts = productMap[primary_condition] || [];
  
  const productMap = {
    Acne: [
      "Salicylic Acid Cleanser",
      "Niacinamide Serum",
      "Oil-Free Moisturizer"
    ],
    Pigmentation: [
      "Vitamin C Serum",
      "Alpha Arbutin",
      "SPF 50 Sunscreen"
    ],
    Dryness: [
      "Hyaluronic Acid Serum",
      "Ceramide Moisturizer",
      "Gentle Cleanser"
    ]
  };
  const routine = regime[result.primary_condition];
  

      const regime = {
      Acne: {
        morning: [
          "Gentle Cleanser",
          "Niacinamide Serum",
          "Oil-Free Moisturizer",
          "SPF 50 Sunscreen"
        ],
        night: [
          "Salicylic Acid Cleanser",
          "Retinol Serum",
          "Hydrating Moisturizer"
        ]
      },

      Pigmentation: {
        morning: [
          "Gentle Cleanser",
          "Vitamin C Serum",
          "Moisturizer",
          "SPF 50 Sunscreen"
        ],
        night: [
          "Cleanser",
          "Alpha Arbutin Serum",
          "Night Cream"
        ]
      },

      Dryness: {
        morning: [
          "Hydrating Cleanser",
          "Hyaluronic Acid Serum",
          "Ceramide Moisturizer",
          "SPF 50 Sunscreen"
        ],
        night: [
          "Gentle Cleanser",
          "Hyaluronic Acid Serum",
          "Rich Moisturizer"
        ]
      }
    };
    console.log("Result state:", state);
    
    

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>Skin Analysis Result</h2>

     <div className="image-wrapper">
      <img src={image} alt="skin" className="result-img" />
      <canvas ref={canvasRef} className="heatmap-canvas"></canvas>
     </div>
      

      <div style={styles.section}>
        <div style={styles.title}>Primary Condition</div>
        <div style={styles.text}>{primary_condition}</div>
      </div>

      <div style={styles.section}>
        <div style={styles.title}>Confidence</div>
        <span style={styles.confidenceBadge}>{confidence}</span>
      </div>

      {acneProgress.length > 0 && (
        <div style={styles.section}>
          <div style={styles.title}>Skin Progress</div>

          {acneProgress.map((scan, i) => (
            <div key={i} style={{ marginBottom: "6px" }}>
              {scan.date} → Acne {scan.confidence}
            </div>
          ))}
        </div>
      )}

      {observations.length > 0 && (
        <div style={styles.section}>
          <div style={styles.title}>Observations</div>
          <ul style={styles.list}>
            {observations.map((o, i) => (
              <li key={i} style={styles.listItem}>{o}</li>
            ))}
          </ul>
        </div>
      )}

      {possible_conditions.length > 0 && (
        <div style={styles.section}>
          <div style={styles.title}>Other Possibilities</div>
          <div style={styles.text}>{possible_conditions.join(", ")}</div>
        </div>
      )}

      <div style={styles.section}>
        <div style={styles.title}>Recommendation</div>
        <div style={styles.text}>{recommendation}</div>
      </div>

      {recommendedProducts.length > 0 && (
        <div style={styles.section}>
          <div style={styles.title}>Recommended Products</div>

          <ul style={styles.list}>
            {recommendedProducts.map((p, i) => (
              <li key={i} style={styles.listItem}>✔ {p}</li>
            ))}
          </ul>
        </div>
      )}

      {routine && (
        <div style={styles.section}>
          <div style={styles.title}>Daily Skincare Routine</div>

          <h3>Morning Routine</h3>
          <ul style={styles.list}>
            {routine.morning.map((r, i) => (
              <li key={i} style={styles.listItem}>☀ {r}</li>
            ))}
          </ul>

          <h3>Night Routine</h3>
          <ul style={styles.list}>
            {routine.night.map((r, i) => (
              <li key={i} style={styles.listItem}>🌙 {r}</li>
            ))}
          </ul>
        </div>
      )}

      <p style={styles.disclaimer}>{medical_disclaimer}</p>

      <button style={styles.button} onClick={() => navigate("/home")}>
        Done
      </button>

    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  },

  h2: {
    textAlign: "center",
    marginBottom: "25px",
    color: "#1f2937",
  },

  h3: {
    marginTop: "20px",
    marginBottom: "8px",
    color: "#2563eb",
    fontSize: "18px",
  },

  section: {
    marginBottom: "20px",
    padding: "15px",
    backgroundColor: "#f9fafb",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2563eb",
    marginBottom: "8px",
  },

  text: {
    fontSize: "15px",
    color: "#374151",
    lineHeight: "1.6",
  },

  confidenceBadge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    fontWeight: "600",
    fontSize: "14px",
  },

  image: {
    display: "block",
    maxWidth: "100%",
    maxHeight: "350px",
    objectFit: "cover",
    margin: "0 auto 20px",
    borderRadius: "10px",
    border: "2px solid #e5e7eb",
  },

  list: {
    paddingLeft: "20px",
    marginBottom: "15px",
  },

  listItem: {
    marginBottom: "6px",
    color: "#4b5563",
  },

  disclaimer: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#fef3c7",
    color: "#92400e",
    fontSize: "13px",
    borderLeft: "4px solid #f59e0b",
    borderRadius: "6px",
  },

  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#ffffff",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
};
