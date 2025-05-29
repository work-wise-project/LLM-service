import { Request, Response } from 'express';
import { generateInterviewPreparation } from '../services/interviewService';
import { ApiError } from '../errors/ApiError';

export const prepareInterview = async (req: Request, res: Response) => {
    if (!req.body.jobLink) {
        throw new ApiError({
            message: 'Job link is required',
            status: 400,
        });
    }

    try {
        const preparation = await generateInterviewPreparation(req.body);
        res.json(preparation);
    } catch (error) {
        console.error('Error generating interview preparation:', error);
        throw new ApiError({
            message: 'Failed to generate interview preparation',
            status: 500,
        });
    }
};
