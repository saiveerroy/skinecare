import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) {
      alert("Please enter your email first!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleReset} style={styles.button}>Send Reset Email</button>
      <p style={styles.link}>
        Back to <span onClick={() => navigate("/login")} style={styles.span}>Login</span>
      </p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: "80px auto",
    padding: 30,
    borderRadius: 10,
    boxShadow: "0 0 15px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: 20,
    color: "#2E7D32",
  },
  input: {
    padding: 12,
    marginBottom: 15,
    borderRadius: 5,
    border: "1px solid #ccc",
    fontSize: 16,
    width: "100%",
  },
  button: {
    padding: 12,
    backgroundColor: "#2E7D32",
    color: "#fff",
    fontSize: 16,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 10,
    width: "100%",
  },
  link: {
    fontSize: 14,
    marginTop: 10,
  },
  span: {
    color: "#2E7D32",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
