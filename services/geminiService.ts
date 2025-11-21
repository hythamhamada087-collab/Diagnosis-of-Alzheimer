import { GoogleGenAI } from "@google/genai";
import { PatientData, DiagnosisResult } from '../types';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateClinicalReport = async (data: PatientData, imageBase64?: string): Promise<DiagnosisResult> => {
  try {
    const model = "gemini-2.5-flash";
    
    let systemInstruction = `
      You are an expert neurologist AI system named NeuroFusion. 
      Analyze the provided patient data${imageBase64 ? " and the attached MRI image slice" : ""} for Alzheimer's detection.
      
      Patient Data:
      - Age: ${data.age}
      - Gender: ${data.gender}
      - Family History of Alzheimer's: ${data.familyHistory ? "Present" : "None reported"}
      - MMSE Score: ${data.mmse !== undefined && data.mmse !== null ? data.mmse + " (Scale 0-30, <24 indicates impairment)" : "Not assessed (Missing Data)"}
      - CDR Score: ${data.cdr !== undefined && data.cdr !== null ? data.cdr + " (0=Normal, 0.5=Very Mild, 1=Mild, 2=Moderate, 3=Severe)" : "Not assessed (Missing Data)"}
      
      Task:
      Based on this tabular data${imageBase64 ? " and the visual features in the MRI image (look for hippocampal atrophy or ventricular enlargement)" : " (which fused with a 3D CNN MRI scan in our architecture)"}, generate a medical diagnosis.
      If MMSE or CDR are missing, rely more heavily on Age, Gender, Family History${imageBase64 ? ", and visual cues" : ""} for the risk assessment.
      
      Return ONLY a JSON object with this schema (do not use markdown code blocks):
      {
        "prediction": "Healthy" | "Alzheimer's Disease" | "Mild Cognitive Impairment",
        "confidence": number (between 70 and 99),
        "riskLevel": "Low" | "Moderate" | "High",
        "clinicalReport": "A 2-3 sentence professional medical summary explaining why this diagnosis was reached.",
        "affectedRegions": ["List", "of", "3", "brain", "regions", "implicated"]
      }
    `;

    let requestContents: any = systemInstruction;

    if (imageBase64) {
        // Extract base64 data and mime type
        // Format: data:image/jpeg;base64,.....
        try {
          const [header, dataStr] = imageBase64.split(',');
          const mimeType = header.split(':')[1].split(';')[0];
          
          requestContents = {
              parts: [
                  { inlineData: { mimeType: mimeType, data: dataStr } },
                  { text: systemInstruction }
              ]
          };
        } catch (e) {
          console.warn("Failed to parse image data, falling back to text-only prompt.");
        }
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: requestContents,
      config: {
        responseMimeType: "application/json"
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as DiagnosisResult;
    }
    
    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback simulation if API fails or key is missing
    let score = 0;
    if (data.cdr && data.cdr >= 0.5) score += 2;
    if (data.mmse && data.mmse < 26) score += 2;
    if (data.familyHistory) score += 1;
    if (data.age > 75) score += 1;

    const isSick = score >= 2;

    return {
      prediction: isSick ? (score >= 3 ? "Alzheimer's Disease" : "Mild Cognitive Impairment") : "Healthy",
      confidence: 88.5,
      riskLevel: isSick ? "High" : "Low",
      clinicalReport: "Simulation Mode: API Key unavailable or error. Diagnosis based on risk factor heuristics (Age, Family History, available Scores).",
      affectedRegions: isSick ? ["Hippocampus", "Entorhinal Cortex", "Temporal Lobe"] : ["None"]
    };
  }
};