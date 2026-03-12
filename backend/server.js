// src/server.js
import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());

app.post("/api/skin-analyze", upload.single("file"), (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file?.originalname);

  res.json({
    primary_condition: "Acne",
    possible_conditions: ["Blackheads", "Whiteheads"],
    confidence: 89,
    recommendation: "Use salicylic acid cleanser twice daily",
    avoid: ["Alcohol", "Harsh scrubs"]
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));