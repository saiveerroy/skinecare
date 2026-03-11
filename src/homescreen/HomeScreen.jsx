//src/homescreen/HomeScreen
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Homescreen.css";
import { auth } from "../firebase";


export default function HomeScreen() {
  const [showHeader, setShowHeader] = useState(true);

  
  const [lastScroll, setLastScroll] = useState(0);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

      useEffect(() => {
      const unsub = onAuthStateChanged(auth, (u) => {
        setUser(u);
      });
      return () => unsub();
    }, []);


    const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user"); // optional
    navigate("/login");      };


    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 30;
        const y = (e.clientY / window.innerHeight - 0.5) * 30;
        setOffset({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }, []);


      const [scrollProgress, setScrollProgress] = useState(0);

      useEffect(() => {
        const handleScroll = () => {
          const scrollTop = window.scrollY;
          const docHeight = document.body.scrollHeight - window.innerHeight;
          const progress = (scrollTop / docHeight) * 100;
          setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);


  const primaryColor = "#d0b95b"; // Define your button color

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > lastScroll && currentScroll > 100) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);


  

  return (
    <div style={styles.container}>
      {/* Header */}
      <header
        style={{
          ...styles.header,
          transform: showHeader ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* Left: Logo */}
        <div style={styles.headerLeft}>
          <h1 style={styles.logo}>✨SKINECARE</h1>
        </div>

        {/* Center: Navigation */}
        <nav style={styles.navCenter}>
          <a href="#slide1" style={styles.navLink}>Home</a>
          <a href="#slide2" style={styles.navLink}>Treatment</a>
          <a href="#slide3" style={styles.navLink}>About</a>
          <a href="#slide4" style={styles.navLink}>Contact</a>
          <a href="#skin-history" style={styles.navLink} onClick={() => navigate("/skin-history")}>Skin History</a>
        </nav>

        {/* Right: Auth Buttons */}
        <div style={styles.headerRight}>
          {user ? (
            <button
              style={styles.authButton}
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                style={styles.authButton}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                style={styles.authButton}
                onClick={() => navigate("/signup")}
              >
                Register
              </button>
            </>
          )}
        </div>

      </header>


      {/* Slides */}
    <main style={styles.slidesContainer}>
          <section
            id="slide1"
            style={styles.slide1}
          >
            {/* Background Glow */}
            <div
              style={{
                ...styles.heroGlow,
                transform: `translate(${offset.x}px, ${offset.y}px)`
              }}
            ></div>

            <Particles
              options={{
                particles: {
                  number: { value: 40 },
                  size: { value: 2 },
                  move: { speed: 1 },
                  opacity: { value: 0.3 },
                },
              }}
            />



            <motion.div
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={styles.slideLeftNew}
            >
              <h2 style={styles.heroTitle}>
                AI Powered <br />
                Skin Analysis
              </h2>

              <p style={styles.heroText}>
                Take a quick intelligent skin assessment and receive personalized
                treatment insights powered by advanced AI technology.
              </p>

              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                style={styles.heroButton}
                onClick={() => {
                  if (user) {
                    navigate("/skin-assessment");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Get Instant Result →
              </motion.button>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                style={styles.scrollIndicator}
              >
              </motion.div>

            </motion.div>
          </section>

        
        {/* Slide 2 */}

        <motion.section
          id="slide2"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}

          viewport={{ once: true }}
          style={styles.slide2}
        >

          {/* Animated Background Blobs */}
          <div style={styles.blob1}></div>
          <div style={styles.blob2}></div>

         <motion.div
            whileHover={{
              rotateX: 5,
              rotateY: -5,
              scale: 1.03,
            }}
            transition={{ type: "spring", stiffness: 200 }}
            style={styles.contentWrapper}
          >

            <h2 style={styles.heading}>
              SKIN CONDITIONS & CARE
            </h2>

            <p style={styles.subText}>
              Discover common skin conditions, expert precautions, and modern AI-powered
              treatment guidance to keep your skin healthy and radiant.
            </p>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={styles.learnButton2}
              onClick={() => navigate("/skin-conditions")}
            >
              Explore Now →
            </motion.button>
          </motion.div>
        </motion.section>





       {/* Slide 3 */}
          <motion.section
            id="slide3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              scrollSnapAlign: "start",
              position: "relative",
              overflow: "hidden",
              background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
            }}
          >
            {/* Glowing effect */}
            <div
              style={{
                position: "absolute",
                width: "600px",
                height: "600px",
                background: "radial-gradient(circle, rgba(255,255,255,0.2), transparent)",
                top: "-150px",
                left: "-150px",
                filter: "blur(120px)",
                animation: "glowMove 10s infinite alternate",
              }}
            />

            <motion.h2
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                fontSize: "48px",
                fontWeight: "700",
                color: "#fff",
                textAlign: "center",
                zIndex: 2,
                textShadow: "0 0 20px rgba(0,0,0,0.6)",
              }}
            >
              ENJOY HEALTHY GLOW
            </motion.h2>
          </motion.section>


          {/* Slide 4 */}
          <motion.section
            id="slide4"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              height: "100vh",
              background: "linear-gradient(135deg,#0f172a,#1e293b)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              scrollSnapAlign: "start",
            }}
          >
            <h2 style={{ fontSize: "42px", fontWeight: "700", marginBottom: "20px" }}>
              Start Your Skincare Journey Today
            </h2>

            <p style={{ fontSize: "18px", color: "#cbd5e1", maxWidth: "600px", marginBottom: "40px" }}>
              Personalized AI-driven insights designed to help you achieve radiant and healthy skin.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: "14px 40px",
                borderRadius: "40px",
                border: "none",
                background: "linear-gradient(135deg,#3b82f6,#6366f1)",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              onClick={() => navigate("/signup")} // navigate to signup page
            >
              Get Started
            </motion.button>

            <p style={{ marginTop: "60px", fontSize: "14px", color: "#64748b" }}>
              © 2026 SKINECARE. All Rights Reserved.
            </p>
          </motion.section>



      </main>
    </div>
  );
}

const styles = {

  container: {
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    backgroundColor: "#0f172a",
    color: "#fff",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 20px", // smaller padding to fit all items
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 100,
    background: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    boxSizing: "border-box",
  },

  headerLeft: {
    flex: "0 0 auto",
  },

  navCenter: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    gap: 25,
    maxWidth: "600px", // prevent nav from stretching too far
    overflowX: "auto", // scroll if needed
  },

  // Header right container for auth buttons
headerRight: {
    flex: "0 0 auto",
    display: "flex",
    gap: 12,
    alignItems: "center",
    whiteSpace: "nowrap", // prevents buttons from wrapping
  },

  // Individual button styles
  authButton: {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 600,
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #53709e, #3e3f6e)",
    color: "#fff",
    transition: "all 0.3s ease",
  },

  // Hover effect (works inline or via styled component)
  authButtonHover: {
    boxShadow: "0 0 20px #3b82f6, 0 0 40px #6366f1",
    transform: "scale(1.05)",
  },



  logo: {
    fontWeight: "800",
    fontSize: 20,
    letterSpacing: 2,
    background: "linear-gradient(90deg,#60a5fa,#a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  nav: { display: "flex", gap: 20 },

  navLink: {
    textDecoration: "none",
    color: "#e2e8f0",
    fontWeight: 500,
    fontSize: 15,
    position: "relative",
    cursor: "pointer",
    paddingBottom: "5px",
  },


  slidesContainer: {
    scrollSnapType: "y mandatory",
    overflowY: "scroll",
    height: "100vh",
  },

  progressBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "3px",
    background: "rgba(255,255,255,0.1)",
  },

  progressBar: {
    height: "100%",
    background: "linear-gradient(90deg,#3b82f6,#9333ea)",
    transition: "width 0.2s ease",
  },


  /* ---------- SLIDE 1 ---------- */

  slide1: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 10%",
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(-45deg, #0f2027, #10323d, #143949, #152550)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 5s ease infinite",
    scrollSnapAlign: "start",
  },

  heroGlow: {
    position: "absolute",
    width: "600px",
    height: "600px",
    background: "radial-gradient(circle, rgba(59,130,246,0.4), transparent)",
    top: "-200px",
    right: "-200px",
    filter: "blur(120px)",
    transition: "transform 0.1s ease-out",
  },

  slideLeftNew: {
    maxWidth: "600px",
    zIndex: 2,
  },

  heroTitle: {
    fontSize: "clamp(32px, 5vw, 60px)",
    fontWeight: "800",
    marginBottom: "25px",
    background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroText: {
    fontSize: "clamp(14px, 2vw, 18px)",
    lineHeight: "1.7",
    marginBottom: "40px",
    color: "#e2e8f0",
  },

  heroButton: {
    padding: "16px 40px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    color: "#fff",
    boxShadow: "0 12px 30px rgba(59,130,246,0.4)",
  },

  /* ---------- SLIDE 2 ---------- */

  slide2: {
    height: "100vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden",
    background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
    scrollSnapAlign: "start",
  },

  blob1: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, #3b82f6, transparent)",
    borderRadius: "50%",
    top: "-100px",
    left: "-100px",
    filter: "blur(100px)",
    animation: "float1 8s ease-in-out infinite",
  },

  blob2: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, #9333ea, transparent)",
    borderRadius: "50%",
    bottom: "-100px",
    right: "-100px",
    filter: "blur(100px)",
    animation: "float2 10s ease-in-out infinite",
  },

  contentWrapper: {
    position: "relative",
    zIndex: 2,
    maxWidth: "700px",
    padding: "60px",
    borderRadius: "25px",
    backdropFilter: "blur(20px)",
    background: "rgba(255,255,255,0.08)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
    transformStyle: "preserve-3d",
    transition: "all 0.3s ease",
  },


  heading: {
    fontSize: "44px",
    fontWeight: "700",
    marginBottom: "20px",
    background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subText: {
    fontSize: "18px",
    lineHeight: "1.7",
    marginBottom: "35px",
    color: "#e2e8f0",
  },

  learnButton2: {
    padding: "14px 35px",
    fontSize: "16px",
    fontWeight: "600",
    borderRadius: "40px",
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
    color: "#fff",
    boxShadow: "0 10px 25px rgba(99,102,241,0.4)",
  },

  /* ---------- FOOTER ---------- */

  footer: {
    height: "100vh",
    background: "linear-gradient(135deg,#0f172a,#1e293b)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    scrollSnapAlign: "start",
  },

  footerTitle: { fontSize: "42px", fontWeight: "700", marginBottom: "20px" },

  footerText: {
    fontSize: "18px",
    color: "#cbd5e1",
    maxWidth: "600px",
    marginBottom: "40px",
  },

  footerButton: {
    padding: "14px 40px",
    borderRadius: "40px",
    border: "none",
    background: "linear-gradient(135deg,#3b82f6,#6366f1)",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },

  copyRight: {
    marginTop: "60px",
    fontSize: "14px",
    color: "#64748b",
  },
};
