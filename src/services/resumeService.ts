import e from 'express';
import { sendMessageToGPT } from '../chatGPT/integration';
import prompts from '../chatGPT/prompts';

export const analyzeAndCheckGrammar = async (text: string) => {
  const [spellCheck, analysis] = await Promise.all([
    sendMessageToGPT({
      prompt: prompts.GrammarCheckPrompt(text),
    }),
    sendMessageToGPT({
      prompt: prompts.AnalyzeResumePrompt(text),
    }),
  ]);

  return {
    spellCheck: spellCheck.choices[0].message.content,
    analysis: analysis.choices[0].message.content,
  };
};

export const analyzeResume = async (text: string) => {
  const analysis = await sendMessageToGPT({
    prompt: prompts.AnalyzeResumePrompt(text),
  });
  return analysis.choices[0].message.content;
};

export const checkGrammar = async (text: string) => {
  const spellCheck = await sendMessageToGPT({
    prompt: prompts.GrammarCheckPrompt(text),
  });
  return spellCheck.choices[0].message.content;
};
