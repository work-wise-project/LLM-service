import { GenerativeModel, VertexAI } from '@google-cloud/vertexai';
import { getConfig } from '../config';
import { Transcript } from '../types';
import { createGenerateContentRequest } from './prompt';

const { googleCloudKey, googleProjectId } = getConfig();

let client: VertexAI;
let model: GenerativeModel;

export const getVertexAIClient = () => {
    if (!client) {
        client = new VertexAI({ project: googleProjectId, googleAuthOptions: { keyFile: googleCloudKey } });
    }
    if (!model) {
        model = client.getGenerativeModel({ model: 'gemini-2.0-flash-001' });
    }

    return {
        analyzeInterview: async (transcript: Transcript[]) => {
            const { response } = await model.generateContent(createGenerateContentRequest(transcript));

            return JSON.parse(response.candidates?.[0].content.parts[0].text || '');
        },
    };
};
