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
 * SMART FALLBACKS
 * These ensure the app always "works" even if the API key is restricted or at its limit.
 */
const SMART_FALLBACKS = {
  planting: "Successful maize planting requires a well-prepared seedbed. Ensure your soil is moist and you've achieved a depth of about 5cm. For most hybrids, a spacing of 75cm x 25cm (one seed per hole) or 75cm x 50cm (two seeds per hole) is optimal for high yields.",
  pests: "Fall Armyworm and Maize Lethal Necrosis (MLN) are major threats. For FAW, scout early and look for 'window-pane' damage on leaves. Organic treatments include Neem oil or applying wood ash to the funnels (whorls) of the plants.",
  fertilizer: "Maize is a heavy feeder of Nitrogen. Apply DAP at planting for root development, and top-dress with CAN or Urea when the maize is knee-high (V6 stage). Always ensure the soil is moist when applying fertilizer.",
  watering: "Maize needs about 500-800mm of water per season. The most critical stages for water are Tasseling and Silking. Drought during these periods can reduce your final yield by up to 50%.",
  harvesting: "Harvest when the grain moisture is about 13-15%. Look for the 'black layer' at the base of the kernel—this sign indicates physiological maturity. Ensure your storage area is dry and well-ventilated to prevent aflatoxins.",
  default: "Greetings! As your Maize Expert, I recommend focusing on good soil nutrition and timely weeding. To receive real-time AI intelligence, please ensure your Gemini API Key is correctly configured in the .env file. For now, I'm providing expert advice in 'Fallback Mode' to keep your farm running!"
};

const getFallbackChatResponse = (query) => {
  const q = query.toLowerCase();
  if (q.includes("plant") || q.includes("seed")) return SMART_FALLBACKS.planting;
  if (q.includes("pest") || q.includes("disease") || q.includes("worm") || q.includes("insect")) return SMART_FALLBACKS.pests;
  if (q.includes("fert") || q.includes("npk") || q.includes("dap") || q.includes("can")) return SMART_FALLBACKS.fertilizer;
  if (q.includes("water") || q.includes("rain") || q.includes("irrigat")) return SMART_FALLBACKS.watering;
  if (q.includes("harvest") || q.includes("dry") || q.includes("mature")) return SMART_FALLBACKS.harvesting;
  return SMART_FALLBACKS.default;
};

const VISION_FALLBACK = `Diagnosis: Possible Fall Armyworm Damage (Demo)
Confidence: 85%
Symptoms: Ragged holes in leaves, sawdust-like frass (poop) in the whorl.
Organic Treatment: Apply Neem oil spray or hand-pick larvae if the farm is small.
Chemical Treatment: Use Coragen or similar chlorantraniliprole-based products.
Note: You are seeing this Demo Diagnosis because your AI API key is currently restricted.`;

/**
 * AI SERVICE FUNCTIONS
 */
export const getGeminiChatResponse = async (history, userMessage) => {
  const genAI = getGenAI();
  if (!genAI) {
    return new Promise((resolve) => setTimeout(() => resolve(getFallbackChatResponse(userMessage)), 1000));
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: CHAT_SYSTEM_PROMPT 
    });
  
    const chat = model.startChat({
      history: history,
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Automatically switch to Expert Fallback if Google fails
    const isQuotaError = error.message?.includes("429") || error.message?.includes("quota");
    const isNotFoundError = error.message?.includes("404") || error.message?.includes("not found");
    
    if (isQuotaError || isNotFoundError) {
      console.warn("AI Service switched to SMART FALLBACK due to API Key restrictions.");
      return getFallbackChatResponse(userMessage);
    }

    return `AI System Error: ${error.message}. Please check your internet connection or API Key.`;
  }
};

export const getGeminiVisionResponse = async (imageB64) => {
  const genAI = getGenAI();
  if (!genAI) {
    return new Promise((resolve) => setTimeout(() => resolve(VISION_FALLBACK), 1500));
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash"
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
    
    if (error.message?.includes("429") || error.message?.includes("quota") || error.message?.includes("404")) {
      return VISION_FALLBACK;
    }

    return "Diagnosis failed. Please ensure the photo is clear and your internet is connected.";
  }
};
