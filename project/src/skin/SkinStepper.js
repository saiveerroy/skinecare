// src/skin/SkinStepper.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SkinStepper.css"; // Optional: for styling

const steps = [
  { path: "/skin-assessment", label: "Start" },
  { path: "/skin-assessment/type", label: "Type" },
  { path: "/skin-assessment/concerns", label: "Concerns" },
  { path: "/skin-assessment/scan", label: "Scan" },
  { path: "/skin-assessment/result", label: "Result" },
];

export default function SkinStepper() {
  const location = useLocation();
  const navigate = useNavigate();

  const currentStepIndex = steps.findIndex((s) =>
    location.pathname.startsWith(s.path)
  );

  return (
    <div className="skin-stepper">
      {steps.map((step, index) => (
        <div
          key={step.path}
          className={`step ${index <= currentStepIndex ? "active" : ""}`}
          onClick={() => {
            if (index <= currentStepIndex) navigate(step.path);
          }}
        >
          <span>{step.label}</span>
          {index < steps.length - 1 && <div className="line" />}
        </div>
      ))}
    </div>
  );
}
