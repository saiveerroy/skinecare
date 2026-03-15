// SkinImageScan.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./skinAssessment.css";

export default function SkinImageScan() {
  const navigate = useNavigate();
  const location = useLocation();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  

  const { texture, skinType, areas, symptoms, duration } =
    location.state || {};

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);



  /* 🔒 Guard */
  useEffect(() => {
    if (!texture || !skinType || !areas) {
      navigate("/skin-assessment");
    }
  }, [texture, skinType, areas, navigate]);

  /* 📸 Start camera (REAR camera) */
  const startCamera = async () => 
    {
      try 
      {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("Camera not supported on this browser");
            return;
          }

          setCameraOn(true);

          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }, // back camera on mobile
            audio: false,
          });

          videoRef.current.srcObject = stream;
      }   catch (err) {
              console.error("Camera error:", err);
              alert("Camera permission denied or unavailable");
            }
    };

        const stopCamera = () => {
          if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
          }
          setCameraOn(false);
        };



        /* 📷 Capture image */
        const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(blob => {
          const file = new File([blob], "captured.jpg", {
            type: "image/jpeg",
          });
          const preview = URL.createObjectURL(file);
            setImage(preview);
          }, "image/jpeg");


        stopCamera(); // ✅ NOW IT EXISTS
      };


      /* 📁 Upload image (mobile-friendly) */
      const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const resizedBlob = await resizeImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setImage(reader.result);
        reader.readAsDataURL(resizedBlob);
      };

      /* 🔧 Resize image (CRITICAL FOR MOBILE) */
      const resizeImage = (file) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = URL.createObjectURL(file);

          img.onload = () => {
            const canvas = document.createElement("canvas");
            const MAX = 512;
            const scale = MAX / img.width;

            canvas.width = MAX;
            canvas.height = img.height * scale;

            canvas.getContext("2d").drawImage(
              img,
              0,
              0,
              canvas.width,
              canvas.height
            );

            canvas.toBlob(
              (blob) => resolve(blob),
              "image/jpeg",
              0.8
            );
          };
        });

      /* 🔄 Convert base64 to File */
      const dataURLtoFile = (dataurl) => {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        const u8arr = new Uint8Array(bstr.length);

        for (let i = 0; i < bstr.length; i++) {
          u8arr[i] = bstr.charCodeAt(i);
        }

        return new File([u8arr], "skin.jpg", { type: mime });
      };

      /* 🧠 Analyze Skin */
     
      const analyzeSkin = async () => {
        if (!image) return;

        setLoading(true);

        try
        {
          const file = dataURLtoFile(image);
          const formData = new FormData();
          formData.append("file", file);

           // NEW (live Render backend)


              const res = await fetch("https://skinecare-backend.onrender.com/api/skin-analyze", {
                method: "POST",
                body: formData,
              });
          

            if (!res.ok) throw new Error("Backend failed");

            const result = await res.json();
            console.log(result);

            // ✅ SAVE TO HISTORY HERE (CORRECT PLACE)
            const historyItem = {
              id: Date.now(),
              image,
              date: new Date().toLocaleString(),
              texture,
              skinType,
              areas,
              symptoms,
              duration,
              result,
              favorite: false,
            };

          const history =
            JSON.parse(localStorage.getItem("skinHistory")) || [];
          history.unshift(historyItem);
          localStorage.setItem("skinHistory", JSON.stringify(history));

          navigate("/skin-assessment/result", {
            state: historyItem,
          });
        } 
        catch (err) {
          alert("Failed to analyze skin. Try again.");
          console.error(err);
        } 
        finally
        {
         setLoading(false);
        }
    

    };





  return (
    <div className="skin-container">
      <div className="header" onClick={() => navigate(-1)}>
        ← <span>AI Skin Scan</span>
      </div>

      <h2>Scan your skin</h2>

      {cameraOn && (
        <div className="camera-box">
          <video ref={videoRef} autoPlay playsInline />
          <button onClick={capturePhoto}>Capture</button>
          <canvas ref={canvasRef} hidden />
        </div>
      )}

      {image && (
        <div className="preview">
          <img src={image} alt="Preview" />
        </div>
      )}

      {!cameraOn && (
        <>
          <button onClick={startCamera}>Use Camera</button>

          <label className="upload-btn">
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleUpload}
            />
          </label>
        </>
      )}

      <button
        className="next-btn"
        disabled={!image || loading}
        onClick={analyzeSkin}
      >
        {loading ? "Analyzing..." : "Analyze Skin"}
      </button>
    </div>
  );
}
