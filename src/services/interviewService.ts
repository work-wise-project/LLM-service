import { getVertexAIClient } from '../vertexAI';
import { ApiError } from '../errors/ApiError';
import { sendMessageToGPT } from '../chatGPT/integration';
import prompts from '../chatGPT/prompts';

export const generateInterviewPreparation = async (jobLink: string, resumeText: string) => {
    try {
        if (!jobLink) {
            throw new ApiError({
                message: 'Job link is required',
                status: 400,
            });
        }

        const result = await sendMessageToGPT({ prompt: prompts.InterviewPreparationPrompt(jobLink) });
        console.log('Interview preparation result:', result);

        return result;
    } catch (error) {
        console.error('Error generating interview preparation:', error);
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError({
            message: 'Failed to generate interview preparation',
            status: 500,
        });
    }
};
