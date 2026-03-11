require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testConnection() {
    console.log("Testing Gemini API Connection...");

    const key = process.env.GEMINI_API_KEY;
    if (!key) {
        console.error("❌ Error: GEMINI_API_KEY is missing from .env file");
        return;
    }

    if (key.includes("PLACE_YOUR_API_KEY")) {
        console.error("❌ Error: You haven't replaced the placeholder text in .env with your actual API key.");
        return;
    }

    console.log(`🔑 Key found: ${key.substring(0, 5)}... (masked)`);

    const genAI = new GoogleGenerativeAI(key);

    try {
        // Attempt to list models to verify the key works and see what's available
        console.log("📡 Fetching available models...");
        // Only certain keys have permission to list models, but try a generation to test if listing fails.

        // Test a simple generation
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = "Hello, are you working?";

        console.log("🤖 Attempting to generate text with 'gemini-1.5-flash'...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log("✅ API Connection Successful!");
        console.log("💬 AI Response:", text);

    } catch (error) {
        console.error("❌ API Error:");
        console.error(error);

        if (error.message.includes("404")) {
            console.log("\n💡 TIP: 404 usually means the model name is wrong or the API key doesn't support the model. Make sure you are using a 'Google AI Studio' key, not Vertex AI.");
        }
    }
}

testConnection();
