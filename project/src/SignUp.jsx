import React, { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await sendEmailVerification(userCred.user);

      // Save extra profile info
      await setDoc(doc(db, "users", userCred.user.uid), {
        name,
        age,
        email
      });

      alert("Verification email sent. Please verify before login.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={styles.page}>
      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSignUp} style={styles.form}>
          <motion.input
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <motion.input
            style={styles.input}
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <motion.input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <motion.div style={styles.passwordBox}>
            <input
              style={styles.passwordInput}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              style={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </motion.div>

          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>

        <p style={styles.link} onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>
      </motion.div>
    </div>
  );
}
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
  },
  card: {
    background: "#fff",
    padding: 30,
    borderRadius: 14,
    width: 360,
    textAlign: "center",
    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
  },
  title: {
    marginBottom: 20,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
  },
  passwordBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    border: "none",
    outline: "none",
    fontSize: 16,
  },
  eye: {
    padding: "0 12px",
    cursor: "pointer",
  },
  button: {
    padding: 12,
    backgroundColor: "#2E7D32",
    color: "#fff",
    fontSize: 16,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
   link: {
    marginTop: 14,
    color: "#1976D2",
    cursor: "pointer",
  },
};
