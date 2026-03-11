import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { motion } from "framer-motion";

export default function HeaderSection() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setOpen(false);
      navigate("/login");
    } catch (error) {
      setOpen(false);
      console.error("Logout failed:", error);
    }
  };

  return (
    <header style={styles.wrapper}>
      {/* Logo */}
      <div
        style={styles.logo}
        onClick={() => navigate("/home")}
        role="button"
        tabIndex={0}
      >
        🌿 SkinCare App
      </div>

      {/* Menu Button */}
      <button
        type="button"
        style={styles.menuBtn}
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        ☰
      </button>

      {/* Dropdown Menu */}
      {open && (
        <nav
          ref={menuRef}               // ✅ IMPORTANT FIX
          style={styles.menu}
          aria-label="Main menu"
          role="menu"
        >
          <button
            style={styles.item}
            role="menuitem"
            onClick={() => {
              setOpen(false);
              navigate("/home");
            }}
          >
            🏠 Home
          </button>

          <button
            style={styles.item}
            role="menuitem"
            onClick={() => {
              setOpen(false);
              navigate("/profile");
            }}
          >
            👤 Profile
          </button>

          <button
            style={styles.item}
            role="menuitem"
            onClick={() => {
              setOpen(false);
              navigate("/help");
            }}
          >
            ❓ Help Center
          </button>

          <hr />

          <button
            style={styles.logout}
            role="menuitem"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </nav>
      )}
    </header>
  );
}

const styles = {
  wrapper: {
    position: "fixed",
    top: 20,
    left: 20,
    right: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1000,
  },
  menuBtn: {
    padding: "10px 14px",
    fontSize: 18,
    borderRadius: "50%",
    border: "none",
    cursor: "pointer",
    background: "#2E7D32",
    color: "#fff",
  },
  menu: {
    position: "absolute",
    top: 50,
    right: 0,
    width: 200,
    background: "#e81515",
    borderRadius: 10,
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    padding: 10,
  },
  item: {
    width: "100%",
    padding: 10,
    border: "none",
    background: "transparent",
    cursor: "pointer",
    textAlign: "left",
    fontSize: 15,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    cursor: "pointer",
  },
  logout: {
    width: "100%",
    padding: 10,
    border: "none",
    background: "#f44336",
    color: "#fff",
    borderRadius: 6,
    cursor: "pointer",
  },
};
