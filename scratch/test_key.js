
import { GoogleGenerativeAI } from "@google/generative-ai";

const key = "AIzaSyCxs20nIORPT7bh02H-4Kxz-5VF5fPLEfI";
const genAI = new GoogleGenerativeAI(key);

async function test() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const result = await model.generateContent("Hello");
        const response = await result.response;
        console.log("SUCCESS: Key works! Response:", response.text());
    } catch (error) {
        console.error("FAILURE:", error.message);
    }
}

test();
