import { getVertexAIClient } from '../vertexAI';
import { ApiError } from '../errors/ApiError';
import prompts from '../vertexAI/prompts';
import { InterviewPreparation } from '../types/preperation';
import { googleSearch } from '../googleSearch';

export const generateInterviewPreparation = async (preperationData: InterviewPreparation) => {
    try {
        if (!preperationData.jobLink) {
            throw new ApiError({
                message: 'Job link is required',
                status: 400,
            });
        }

        const searchPromptResult = await getVertexAIClient().sendMessageToGPT({
            message: prompts.SearchQueryPrompt(preperationData),
        });

        const searchQueries = JSON.parse(searchPromptResult);

        let counter = 1;
        const links = [];

        for (const query of searchQueries) {
            if (counter > 5) {
                break;
            }
            links.push(...(await googleSearch(query)));
            counter++;
        }

        const result = await getVertexAIClient().sendMessageToGPT({
            message: prompts.InterviewPreparationPrompt({
                ...preperationData,
                listOfLinksWithTitlesAndSnippets: links,
            }),
            systemInstruction: 'You are an expert career coach helping prepare a candidate for an interview.',
        });

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
