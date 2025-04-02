import { Router } from 'express';
import { processResume } from '../contorllers/resumeController';

export const resume = Router();

resume.get('/', async (req, res) => {
  res.status(200).send('Hello World from resume router');
});

resume.post('/process-resume', processResume);
