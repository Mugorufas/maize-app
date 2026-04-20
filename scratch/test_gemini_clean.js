import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const env = fs.readFileSync(".env", "utf8");
const match = env.match(/VITE_GEMINI_API_KEY=(.*)/);
const key = match ? match[1].trim() : null;

const testKey = async () => {
    if (!key) {
        console.log("No key found in .env");
        return;
    }
    
    console.log("Testing Key:", key.substring(0, 10) + "...");
    const genAI = new GoogleGenerativeAI(key);
    
    try {
        console.log("Fetching models...");
        const result = await genAI.listModels();
        console.log("Models found:", result.models.length);
        result.models.forEach(m => {
            console.log(`- ${m.name}`);
        });
    } catch (error) {
        console.error("ERROR:", error.message);
        if (error.message.includes("API key not valid")) {
            console.log("\n>>> THE KEY IS INVALID: Standard Gemini keys start with 'AIzaSy' and are usually 39-40 chars. Your key looks like a Firebase key which might not have the AI API enabled.");
        }
    }
};

testKey();
