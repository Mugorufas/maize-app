import { GoogleGenerativeAI } from "@google/generative-ai";

const getGenAI = () => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;
    if (!key) {
        console.warn("Gemini API Key missing! Check your .env file.");
        return null;
    }
    return new GoogleGenerativeAI(key);
};

/**
 * SYSTEM PROMPTS
 */
const CHAT_SYSTEM_PROMPT = `
You are a "Senior Maize Agronomist" and the AI Assistant for the Maize Farming Platform. 
Your goal is to provide expert, practical, and science-based advice to maize farmers.
- Use a professional yet friendly tone.
- If asked about pests, mention specific common ones like Fall Armyworm or Maize Lethal Necrosis if relevant.
- Always encourage sustainable and organic practices where possible alongside chemical ones.
- Keep answers concise and structured using bullet points if needed.
- Only answer questions related to agriculture and maize farming. If asked a general question, politely redirect to maize farming.
`;

const VISION_SYSTEM_PROMPT = `
Analyze this image of a maize plant. 
1. Identify if there is a pest, disease, or nutrient deficiency.
2. Provide the name of the issue.
3. Provide a Confidence Level (0-100%).
4. List symptoms visible in the image.
5. Provide 1 Organic Treatment and 1 Chemical Treatment.
Format the response as clear sections.
`;

/**
 * MOCK RESPONSES (For when API key is missing or to save usage)
 */
const getMockChatResponse = (query) => {
  return "Greetings! As your Maize Expert, I can tell you that successful maize farming starts with good soil preparation. Regarding your question: '" + query + "', I recommend checking our Watering Guide and ensuring your NPK levels are balanced. Since I'm currently in 'Mock Mode', please add your API Key to the .env file for real-time AI intelligence!";
};

const getMockVisionResponse = () => {
  return "Diagnosis: Possible Fall Armyworm Damage\nConfidence: 85%\nSymptoms: Ragged holes in leaves, sawdust-like frass.\nOrganic: Neem oil spray.\nChemical: Coragen or similar chlorantraniliprole-based product.";
};

/**
 * AI SERVICE FUNCTIONS
 */
export const getGeminiChatResponse = async (history, userMessage) => {
  const genAI = getGenAI();
  if (!genAI) {
    return new Promise((resolve) => setTimeout(() => resolve(getMockChatResponse(userMessage)), 1000));
  }

  try {
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview", // UPDATED THIS
      systemInstruction: CHAT_SYSTEM_PROMPT 
    });
  
    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Chat Error Details:", error);
    try {
      const gAI = getGenAI();
      const result = await gAI.listModels();
      const modelNames = result.models.map(m => m.name.replace('models/', '')).join(", ");
      return `AI Error: ${error.message}. \n\nTry one of these available models: ${modelNames}`;
    } catch (listError) {
      return `AI Error: ${error.message}. \n\n(Also failed to retrieve model list. Please check your API key permissions.)`;
    }
  }
};

export const getGeminiVisionResponse = async (imageB64) => {
  const genAI = getGenAI();
  if (!genAI) {
    return new Promise((resolve) => setTimeout(() => resolve(getMockVisionResponse()), 1500));
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview"  // UPDATED THIS
    }); 
    
    const imagePart = {
      inlineData: {
        data: imageB64.split(",")[1], // Remove the "data:image/png;base64," part
        mimeType: "image/jpeg",
      },
    };

    const result = await model.generateContent([VISION_SYSTEM_PROMPT, imagePart]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Diagnosis failed. Please ensure the photo is clear and try again.";
  }
};
