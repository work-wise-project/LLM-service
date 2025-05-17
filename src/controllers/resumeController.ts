import {
  analyzeAndCheckGrammar,
  analyzeResume,
  checkGrammar,
} from '../services/resumeService';
import { Request, Response } from 'express';

export const processResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      console.error('No text provided in the request body');
      res.status(400).json({ error: 'No text provided' });
      return;
    }

    const result = await analyzeAndCheckGrammar(resumeText);
    res.json(result);
  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ error: error ?? 'Failed to process resume' });
  }
};

export const processAnalyzeResume = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      console.error('No text provided in the request body');
      res.status(400).json({ error: 'No text provided' });
      return;
    }

    const result = await analyzeResume(resumeText);
    res.json(result);
  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ error: error ?? 'Failed to process resume' });
  }
};
export const processCheckGrammar = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) {
      console.error('No text provided in the request body');
      res.status(400).json({ error: 'No text provided' });
      return;
    }

    const result = await checkGrammar(resumeText);
    res.json(result);
  } catch (error) {
    console.error('Error processing resume:', error);
    res.status(500).json({ error: error ?? 'Failed to process resume' });
  }
};
