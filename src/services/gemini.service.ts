import { Injectable } from '@angular/core';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

@Injectable()
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // IMPORTANT: The API key is sourced from environment variables.
    // Do not hardcode or expose client-side in a real application.
    // This is for demonstration purposes in the Applet environment.
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY environment variable not set.");
      throw new Error("API_KEY environment variable not set.");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateVision(topic: string): Promise<string> {
    try {
      const prompt = `Generate a short, powerful, and inspiring corporate vision statement for 'Telster Inc.', a global enterprise in FinTech, Energy, AI, and Mobility. The vision should be in a style similar to Tesla, focusing on the topic of '${topic}'. The statement must be a single, concise sentence.`;

      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const text = response.text.trim();
      // Clean up potential markdown or quotes
      return text.replace(/["*]/g, '');

    } catch (error) {
      console.error('Error generating content from Gemini API:', error);
      throw new Error('Failed to communicate with the AI model.');
    }
  }
}
