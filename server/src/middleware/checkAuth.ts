import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../lib/env';

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
                username: string;
            };
        }
    }
}

export const checkAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            throw new Error('Unauthorized');
        }

        const decoded = jwt.verify(token, env.JWT_SECRET) as {
            userId: string;
            username: string;
        };
        req.user = { userId: decoded.userId, username: decoded.username };
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};
