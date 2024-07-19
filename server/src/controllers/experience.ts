import { NextFunction, Request, Response } from 'express';
import { createWorkExperience } from '../services/experience';

export const createExperience = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.user || !req.user.userId) {
            throw new Error('Unauthorized');
        }

        const {
            company,
            jobTitle,
            startMonth,
            startYear,
            endMonth,
            endYear,
            details,
        } = req.body;

        const workExperience = await createWorkExperience({
            userId: Number(req.user.userId),
            company,
            jobTitle,
            startMonth,
            startYear,
            endMonth,
            endYear,
            details,
        });

        return res.status(201).json({
            status: 'success',
            data: {
                workExperience,
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
