// src/homescreen/Profile.jsx
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(u);

      try {
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setName(snap.data().name || "");
          setAge(snap.data().age || "");
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const saveProfile = async () => {
    if (!user) return;

    if (!name || !age) {
      alert("Please enter name and age");
      return;
    }

    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          email: user.email,
          name,
          age,
        },
        { merge: true }
      );

      alert("Profile saved successfully ✅");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save profile ❌");
    }
  };

  if (loading) {
    return <p style={{ padding: 30 }}>Loading profile...</p>;
  }

  if (!user) {
    return <p style={{ padding: 30 }}>User not logged in</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={styles.card}
    >
      <h2>My Profile</h2>

      <p><b>Email:</b> {user.email}</p>

      <input
        style={styles.input}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <button style={styles.button} onClick={saveProfile}>
        Save Profile
      </button>
    </motion.div>
  );
}

const styles = {
  card: {
    maxWidth: 420,
    margin: "80px auto",
    padding: 30,
    borderRadius: 12,
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    margin: "10px 0",
    borderRadius: 8,
    border: "1px solid #ccc",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 12,
    background: "#2E7D32",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontSize: 16,
    marginTop: 10,
  },
};
