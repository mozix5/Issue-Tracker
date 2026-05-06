import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { title, description } = body;

  const apiKey = process.env.GOOGLE_AI_API_KEY?.trim();

  if (!title || !description) {
    return NextResponse.json(
      { error: "Title and description are required" },
      { status: 400 }
    );
  }

  if (!apiKey) {
    // Fallback if no API key is provided - simple rule-based triage
    let priority = "MEDIUM";
    if (title.toLowerCase().includes("urgent") || description.toLowerCase().includes("crash")) {
      priority = "URGENT";
    } else if (title.toLowerCase().includes("bug") || description.toLowerCase().includes("error")) {
      priority = "HIGH";
    }
    
    return NextResponse.json({
      priority,
      suggestion: "Please provide a GOOGLE_AI_API_KEY for real AI analysis.",
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    console.log("Using API Key (first 5):", apiKey.substring(0, 5));
    console.log("Using Model: gemini-3-flash-preview");

    const prompt = `
      You are an expert project manager. Analyze the following issue and suggest a Priority (LOW, MEDIUM, HIGH, URGENT).
      Return ONLY a JSON object in this format: {"priority": "PRIORITY_VALUE", "reason": "Short reason why"}
      
      Issue Title: ${title}
      Issue Description: ${description}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response (handles markdown code blocks)
    const jsonString = text.includes("```json") 
      ? text.split("```json")[1].split("```")[0].trim()
      : text.match(/\{[\s\S]*\}/)?.[0] || text;
      
    const triage = JSON.parse(jsonString);

    return NextResponse.json({
      priority: triage.priority || "MEDIUM",
      reason: triage.reason || "AI analysis complete"
    });
  } catch (error) {
    console.error("AI Triage Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze issue" },
      { status: 500 }
    );
  }
}
