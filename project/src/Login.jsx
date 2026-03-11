//src/Login.jsx
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [notVerified, setNotVerified] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 page user wanted before login
  const from = location.state?.from || "/";
  const [user, setUser] = useState(null);
  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);


  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");
  setNotVerified(false);

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (!res.user.emailVerified) {
      setNotVerified(true);
      setMessage("⚠️ Please verify your email to continue.");
      setLoading(false);
      return;
    }

    // Optional: store minimal info (NOT required for auth)
    localStorage.setItem(
      "user",
      JSON.stringify({
        uid: res.user.uid,
        email: res.user.email,
      })
    );

    // ✅ NOW redirect safely
    navigate(from, { replace: true });

  } catch (err) {
    setMessage(err.message);
  } finally {
    setLoading(false);
  }
};


  const resendEmail = async () => {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      setMessage("✅ Verification email resent!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={styles.page}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={styles.card}
      >
        <h2>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your account</p>

        {message && <p style={styles.message}>{message}</p>}

        <motion.form
          onSubmit={handleLogin}
          style={styles.form}
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.input
            variants={inputAnim}
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <motion.div variants={inputAnim} style={styles.passwordBox}>
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

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={styles.button}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </motion.form>

        {notVerified && (
          <button style={styles.resendBtn} onClick={resendEmail}>
            Resend Verification Email
          </button>
        )}

        <p style={styles.link} onClick={() => navigate("/forgot")}>
          Forgot Password?
        </p>

        <p style={styles.link} onClick={() => navigate("/signup")}>
          Don’t have an account? Sign Up
        </p>
      </motion.div>
    </motion.div>
  );
}

const inputAnim = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(135deg, #43cea2, #185a9d)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    width: 380,
    padding: 30,
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  subtitle: { color: "#666", marginBottom: 20 },
  form: { display: "flex", flexDirection: "column", gap: 14 },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
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
  eye: { padding: "0 12px", cursor: "pointer" },
  button: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "none",
    background: "#2E7D32",
    color: "#fff",
    cursor: "pointer",
  },
  resendBtn: {
    marginTop: 12,
    padding: 10,
    background: "#1976D2",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  link: {
    marginTop: 14,
    color: "#1976D2",
    cursor: "pointer",
  },
  message: {
    color: "#d32f2f",
    marginBottom: 10,
  },
};
