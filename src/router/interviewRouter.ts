import { Router } from 'express';
import { prepareInterview } from '../controllers/interviewController';
import { getVertexAIClient } from '../vertexAI';
import prompts from '../vertexAI/prompts';

export const createInterviewRouter = () => {
    const router = Router();

    router.post('/analysis', async (req, res) => {
        const { transcript, skills, history } = req.body;
        if (!transcript || !skills || !history) {
            res.status(400).json({ error: 'transcript, skills, and history are required' });
            return;
        }

        res.status(200).send({
            analysis: JSON.parse(
                await getVertexAIClient().sendMessageToGPT({
                    message: JSON.stringify({ transcript, skills, history }),
                    systemInstruction: prompts.InterviewAnalysisSystemInstruction,
                })
            ),
        });
    });

    router.post('/preparation', prepareInterview);

    return router;
};
