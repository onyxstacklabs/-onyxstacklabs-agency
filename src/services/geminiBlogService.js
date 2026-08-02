import { GoogleGenerativeAI } from "@google/generative-ai";

// Vite env variable access
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Latest 2026 stable model fallback
const DEFAULT_MODEL = "gemini-1.5-flash";

const SYSTEM_INSTRUCTIONS = `
You are an expert technical blog writer and SEO strategist at OnyxStack Labs.
Your primary objective is to generate completely humanized, high-ranking, and natural blog posts.

STRICT WRITING GUIDELINES:
1. HUMANIZED TONE: Avoid robotic AI clichés (e.g., "In today's fast-paced digital era", "Delve deep", "Leverage", "Revolutionize", "It is worth noting"). Use direct, conversational, and professional English.
2. STRUCTURE: Use scannable formatting with short paragraphs, clear H2 and H3 headings, bold key takeaways, and bullet points.
3. SEO & KEYWORDS: Naturally place relevant primary and long-tail keywords in headings and body text.
4. INTERNAL LINKING: Include 2 to 3 contextual internal markdown links where appropriate to OnyxStack ecosystem (e.g., OnyxStack Labs main services at https://onyxstacklabs.com or Student Portal at https://student.onyxstacklabs.com).
5. VISUAL PROMPT: Provide a detailed prompt to fetch or generate a relevant featured image for the post.
`;

export const generateBlogDraft = async (userTopic) => {
  if (!API_KEY) {
    throw new Error("Gemini API Key missing! Check VITE_GEMINI_API_KEY in environment variables.");
  }

  try {
    const model = genAI.getGenerativeModel({
      model: DEFAULT_MODEL,
      systemInstruction: SYSTEM_INSTRUCTIONS,
    });

    const prompt = `
      Topic: "${userTopic}"
      Generate a complete blog payload in JSON format ONLY with the following structure:
      {
        "title": "SEO Optimized Catchy Title",
        "slug": "seo-friendly-url-slug",
        "metaDescription": "Concise meta description under 150 characters",
        "tags": ["tag1", "tag2", "tag3"],
        "featuredImageKeyword": "3D modern tech graphic prompt for featured image related to ${userTopic}",
        "contentMarkdown": "Full blog body in clear Markdown with subheadings, internal links, and humanized content."
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean JSON output from potential markdown ticks
    const cleanJson = responseText.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanJson);

  } catch (error) {
    console.error("Error generating blog with Gemini:", error);
    throw error;
  }
};
