import React from "react";

export default function SkinConditions() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Skin Diseases & Treatments</h1>

      <div style={styles.card}>
        <h2>Acne</h2>
        <p><strong>Precautions:</strong> Avoid oily products, wash face twice daily, avoid touching face.</p>
        <p><strong>Treatment:</strong> Salicylic acid, benzoyl peroxide, consult dermatologist if severe.</p>
      </div>

      <div style={styles.card}>
        <h2>Eczema</h2>
        <p><strong>Precautions:</strong> Use fragrance-free products, avoid hot showers.</p>
        <p><strong>Treatment:</strong> Moisturizers, hydrocortisone creams.</p>
      </div>

      <div style={styles.card}>
        <h2>Psoriasis</h2>
        <p><strong>Precautions:</strong> Manage stress, avoid skin injuries.</p>
        <p><strong>Treatment:</strong> Topical steroids, light therapy.</p>
      </div>

      <div style={styles.card}>
        <h2>Sun Damage</h2>
        <p><strong>Precautions:</strong> Use SPF 30+ sunscreen daily.</p>
        <p><strong>Treatment:</strong> Aloe vera, Vitamin C serums.</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "60px 80px",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
    minHeight: "100vh",
    color: "#fff",
  },
  heading: {
    textAlign: "center",
    marginBottom: 40,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#333",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
};
