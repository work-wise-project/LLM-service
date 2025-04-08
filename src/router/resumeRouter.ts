import { Router } from 'express';
import {
  processResume,
  processAnalyzeResume,
  processCheckGrammar,
} from '../contorllers/resumeController';

export const resume = Router();

resume.get('/', async (req, res) => {
  res.status(200).send('Hello World from resume router');
});

resume.post('/process-resume', processResume);

resume.post('/analyze-resume', processAnalyzeResume);

resume.post('/check-grammar', processCheckGrammar);
