import { GoogleGenAI } from "@google/genai";
import { Emotion } from '../types';

// Initialize the API client
// Note: In a real production app, ensure the API key is secured via a backend proxy.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const analyzeEmotion = async (text: string): Promise<Emotion> => {
  if (!apiKey) {
    console.warn("No API Key found. Using fallback keyword matching.");
    return fallbackKeywordDetection(text);
  }

  try {
    const prompt = `
      Analyze the sentiment and emotion of the following user text: "${text}".
      
      Classify it strictly into exactly one of these categories:
      - Happy
      - Sad
      - Angry
      - Relaxed
      - Energetic
      
      If the emotion is unclear or mixed, choose the most dominant one. 
      If it is completely neutral, return 'Relaxed'.
      
      Return ONLY the category name as a single word. Do not add punctuation or explanation.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const rawResult = response.text?.trim();
    
    // Normalize and map to Enum
    switch (rawResult) {
      case 'Happy': return Emotion.Happy;
      case 'Sad': return Emotion.Sad;
      case 'Angry': return Emotion.Angry;
      case 'Relaxed': return Emotion.Relaxed;
      case 'Energetic': return Emotion.Energetic;
      default: 
        console.warn(`Gemini returned unexpected value: ${rawResult}. Falling back.`);
        return Emotion.Relaxed; // Safe default
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    return fallbackKeywordDetection(text);
  }
};

// Fallback logic for demo purposes if API fails or key is missing
const fallbackKeywordDetection = (text: string): Emotion => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.match(/happy|joy|great|awesome|good|love|fun/)) return Emotion.Happy;
  if (lowerText.match(/sad|cry|depressed|lonely|down|bad|grief/)) return Emotion.Sad;
  if (lowerText.match(/angry|mad|furious|hate|irritated|annoyed/)) return Emotion.Angry;
  if (lowerText.match(/relax|calm|peace|sleep|chill|tired|stress/)) return Emotion.Relaxed;
  if (lowerText.match(/energy|power|pumped|run|gym|party|dance/)) return Emotion.Energetic;

  return Emotion.Relaxed;
};