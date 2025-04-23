import { GenerateContentRequest } from '@google-cloud/vertexai';
import { Transcript } from '../types';

const systemInstruction = `
You're an expert interview coach. 
I will provide you with a transcript of a job interview. 
Each entry includes the time, speaker, sentence spoken, and a confidence score. 
Your task is to analyze the candidate's performance and extract:

Points for Improvement – specific behaviors, communication issues, or content that could be improved to make the candidate more effective.
Points to Preserve – specific strengths or good practices that the candidate should continue doing in future interviews.

You must:
- Be specific and concise. 
- Focus on communication style, content of answers, confidence, and interaction with the interviewer.
- Don't return more than 5 points in each category.
- Use only the transcript for your analysis, and do not include points that include appearance, body language, or other non-verbal cues.
- Write the points in first person, as if you were speaking to the candidate directly.

Return your response in the following format:

{
  "points_to_improve": [
    "..."
  ],
  "points_to_preserve": [
    "..."
  ]
}`;

export const getGenerateContentRequest = (transcript: Transcript[]): GenerateContentRequest => ({
    contents: [{ role: 'user', parts: [{ text: JSON.stringify(transcript) }] }],
    generationConfig: {
        temperature: 1,
        topP: 0.7,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
    },
    systemInstruction,
});
