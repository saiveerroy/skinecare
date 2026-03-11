import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";
import { useNavigate } from "react-router-dom";

export default function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      alert("OTP sent! Check your phone.");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        alert("Phone number verified!");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
      alert("Invalid OTP");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
      <h2>Login with Phone</h2>

      <form onSubmit={confirmationResult ? handleVerifyOtp : handleSendOtp}>
        <div style={{ marginBottom: 15 }}>
          <label>Phone Number:</label>
          <input
            type="tel"
            placeholder="+911234567890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required={!confirmationResult}
            disabled={confirmationResult}
            style={{ width: "100%", padding: 8, marginTop: 5 }}
          />
        </div>

        {confirmationResult && (
          <div style={{ marginBottom: 15 }}>
            <label>Enter OTP:</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              style={{ width: "100%", padding: 8, marginTop: 5 }}
            />
          </div>
        )}

        <button
          type="submit"
          style={{ padding: "10px 20px", backgroundColor: "#2E7D32", color: "white", border: "none", borderRadius: 5 }}
        >
          {confirmationResult ? "Verify OTP" : "Send OTP"}
        </button>
      </form>

      <div id="recaptcha-container"></div>
    </div>
  );
}
