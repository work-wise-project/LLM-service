import { getVertexAIClient } from '../vertexAI';
import prompts from '../vertexAI/prompts';

export const analyzeAndCheckGrammar = async (text: string) => {
    const [spellCheck, analysis] = await Promise.all([
        getVertexAIClient().sendMessageToGPT({ message: prompts.GrammarCheckPrompt(text), jsonResponse: false }),
        getVertexAIClient().sendMessageToGPT({ message: prompts.AnalyzeResumePrompt(text) }),
    ]);

    return {
        spellCheck,
        analysis,
    };
};

export const analyzeResume = async (text: string) => {
    return getVertexAIClient().sendMessageToGPT({ message: prompts.AnalyzeResumePrompt(text) });
};

export const checkGrammar = async (text: string) => {
    return getVertexAIClient().sendMessageToGPT({ message: prompts.GrammarCheckPrompt(text), jsonResponse: false });
};
