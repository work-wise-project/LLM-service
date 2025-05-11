import { Request, Response } from 'express';
import { generateInterviewPreparation } from '../services/interviewService';
import { ApiError } from '../errors/ApiError';

export const prepareInterview = async (req: Request, res: Response) => {
    const { jobDescription: jobLink, resumeText } = req.body;

    if (!jobLink || !resumeText) {
        throw new ApiError({
            message: 'Job link and resume text are required',
            status: 400,
        });
    }

    try {
        const preparation = await generateInterviewPreparation(jobLink, resumeText);
        res.status(200).json({ preparation });
    } catch (error) {
        console.error('Error generating interview preparation:', error);
        throw new ApiError({
            message: 'Failed to generate interview preparation',
            status: 500,
        });
    }
};
