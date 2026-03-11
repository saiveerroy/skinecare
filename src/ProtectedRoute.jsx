import { Navigate, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  // ✅ REQUIRED STATE
  const [user, setUser] = useState(undefined); // undefined = checking
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);          // Firebase user OR null
      setChecking(false);  // auth check finished
    });

    return () => unsub();
  }, []);

  // ⏳ Wait for Firebase
  if (checking) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  // 🔐 Not logged in
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // ✅ Logged in
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
