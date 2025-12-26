
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getTechnicalAdvice = async (prompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are a world-class blockchain architect specializing in BNB Chain, Solidity, and high-frequency trading bots. Provide concise, secure, and highly technical advice using real-time search data when necessary.",
        tools: [{ googleSearch: {} }],
      }
    });

    // Extract URLs if grounding metadata exists
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const urls = chunks
      .map((c: any) => c.web?.uri)
      .filter(Boolean);

    let text = response.text || "No response received.";
    if (urls.length > 0) {
      const uniqueUrls = Array.from(new Set(urls));
      text += "\n\n**Sources:**\n" + uniqueUrls.map(url => `- [${url}](${url})`).join('\n');
    }
    
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with AI architect. Please check your network or API configuration.";
  }
};

export const getMarketPulse = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "What are the top 5 trending memecoins on BNB Chain right now? Include their names and brief context on why they are trending. Provide this in a concise format.",
      config: {
        tools: [{ googleSearch: {} }],
      }
    });
    return response.text || "No market pulse available.";
  } catch (error) {
    console.error("Gemini Market Pulse Error:", error);
    return "Failed to fetch real-time market pulse.";
  }
};
