import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const testKey = async () => {
    const key = process.env.VITE_GEMINI_API_KEY;
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
            console.log(`- ${m.name} (Methods: ${m.supportedMethods.join(', ')})`);
        });
    } catch (error) {
        console.error("ERROR:", error.message);
        if (error.message.includes("API key not valid")) {
            console.log("\n>>> DETECTED: Your API key is physically invalid. Please get a new one from https://aistudio.google.com/");
        } else if (error.message.includes("limit") || error.message.includes("quota")) {
            console.log("\n>>> DETECTED: This key has a ZERO quota. This usually happens if the project is restricted or disabled.");
        }
    }
};

testKey();
