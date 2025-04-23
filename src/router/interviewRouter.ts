import { Router } from 'express';
import { getVertexAIClient } from '../vertexAI';

export const createInterviewRouter = () => {
    const router = Router();

    router.post('/analysis', async (req, res) => {
        const { transcript } = req.body;
        if (!transcript) {
            res.status(400).json({ error: 'transcript is required' });
            return;
        }

        const analysis = await getVertexAIClient().analyzeInterview(transcript);
        // TODO: save analysis to database

        res.status(200).send({ analysis });
    });

    return router;
};
