import { GenerativeModel, VertexAI } from '@google-cloud/vertexai';
import { getConfig } from '../config';

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
        sendMessageToGPT: async ({
            message,
            jsonResponse = true,
            systemInstruction,
        }: {
            message: string;
            jsonResponse?: boolean;
            systemInstruction?: string;
        }) => {
            const { response } = await model.generateContent({
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: message }],
                    },
                ],
                generationConfig: {
                    temperature: 1,
                    topP: 0.7,
                    maxOutputTokens: 8192,
                    responseMimeType: jsonResponse ? 'application/json' : 'text/plain',
                },
                systemInstruction,
            });

            return response.candidates?.[0].content.parts[0].text || '';
        },
    };
};
