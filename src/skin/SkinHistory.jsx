// src/skin/SkinHistory.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./skinAssessment.css";
import jsPDF from "jspdf";

export default function SkinHistory() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("skinHistory")) || [];
    setHistory(saved);
  }, []);

  const toggleFavorite = (index) => {
    const updated = [...history];
    updated[index].favorite = !updated[index].favorite;
    setHistory(updated);
    localStorage.setItem("skinHistory", JSON.stringify(updated));
  };

  const deleteHistory = (index) => {
    const updated = [...history];
    updated.splice(index, 1);
    setHistory(updated);
    localStorage.setItem("skinHistory", JSON.stringify(updated));
  };

  const clearAll = () => {
    if (!window.confirm("Clear all skin history?")) return;
    localStorage.removeItem("skinHistory");
    setHistory([]);
  };

  // Favorites first
  const sortedHistory = [...history].sort(
    (a, b) => (b.favorite === true) - (a.favorite === true)
  );

  const exportPDF = (item) => {
    const pdf = new jsPDF("p", "mm", "a4");
    let y = 20;
    const marginX = 20;
    const pageWidth = 210;

    // Title
    pdf.setFontSize(18);
    pdf.setTextColor("#2563eb");
    pdf.text("Skin Analysis Result", pageWidth / 2, y, { align: "center" });
    y += 15;

    // Image
    if (item.image) {
      pdf.addImage(item.image, "JPEG", marginX, y, 170, 100);
      y += 110;
    }

    const addSection = (title, content, options = {}) => {
      pdf.setFontSize(14);
      pdf.setTextColor("#2563eb");
      pdf.text(title, marginX, y);
      y += 8;

      pdf.setFontSize(12);
      pdf.setTextColor("#374151");

      if (options.isList && Array.isArray(content)) {
        content.forEach((line) => {
          pdf.text(`- ${line}`, marginX + 5, y);
          y += 7;
        });
      } else {
        const splitText = pdf.splitTextToSize(content, pageWidth - marginX * 2);
        pdf.text(splitText, marginX, y);
        y += splitText.length * 7;
      }

      y += 10; // space after section
    };

    addSection("Primary Condition", item.result?.primary_condition || "N/A");
    addSection("Confidence", item.result?.confidence || "N/A");

    if (item.result?.observations?.length) {
      addSection("Observations", item.result.observations, { isList: true });
    }

    if (item.result?.possible_conditions?.length) {
      addSection("Other Possibilities", item.result.possible_conditions.join(", "));
    }

    addSection("Recommendation", item.result?.recommendation || "N/A");

    // Disclaimer box
    if (item.result?.medical_disclaimer) {
      pdf.setFillColor("#fef3c7");
      pdf.rect(marginX - 5, y - 5, pageWidth - marginX * 2 + 10, 20, "F");

      pdf.setFontSize(11);
      pdf.setTextColor("#92400e");
      const disclaimerLines = pdf.splitTextToSize(item.result.medical_disclaimer, pageWidth - marginX * 2);
      pdf.text(disclaimerLines, marginX, y + 5);
      y += 30;
    }

    pdf.save("Skin_Analysis_Result.pdf");
  };

  return (
    <div className="skin-container">
      <div className="header" onClick={() => navigate("/home")}>
        ← <span>Home</span>
      </div>

      <h2>Skin Analysis History</h2>

      {sortedHistory.length === 0 ? (
        <p>No previous scans found</p>
      ) : (
        <>
          <button className="clear-btn" onClick={clearAll}>
            Clear All History
          </button>

          {sortedHistory.map((item, index) => (
            <div className="history-card" key={item.id || index}>
              {/* Top row */}
              <div className="history-top">
                <p className="history-date">{item.date}</p>
                <button
                  className={`fav-btn ${item.favorite ? "active" : ""}`}
                  onClick={() => toggleFavorite(index)}
                  title="Mark as favorite"
                >
                  {item.favorite ? "★" : "☆"}
                </button>
              </div>

              {/* Preview image */}
              {item.image && (
                <img src={item.image} alt="Skin preview" className="history-img" />
              )}

              <p>
                <strong>Skin Type:</strong> {item.skinType}
              </p>

              <p>
                <strong>Symptoms:</strong>{" "}
                {Array.isArray(item.symptoms)
                  ? item.symptoms.join(", ")
                  : item.symptoms || "None"}
              </p>

              <p>
                <strong>Detected:</strong>{" "}
                {item.result?.conditions?.join(", ") || "N/A"}
              </p>

              <div className="history-actions">
                <button
                  onClick={() =>
                    navigate("/skin-assessment/result", {
                      state: item,
                    })
                  }
                >
                  View Result
                </button>

                <button
                  className="danger-btn"
                  onClick={() => deleteHistory(index)}
                >
                  Delete
                </button>

                <button
                  className="export-btn"
                  onClick={() => exportPDF(item)}
                >
                  Export PDF
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
