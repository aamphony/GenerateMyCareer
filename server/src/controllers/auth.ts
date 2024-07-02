import { NextFunction, Request, Response } from 'express';
import { createUser } from '../services/user';
import { loginUser as loginUserAndGenerateToken } from '../services/auth';

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        const newUser = await createUser({ username, password });

        res.status(201).json({
            user: {
                id: newUser.id,
                username: newUser.username,
                createdAt: newUser.createdAt,
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        const token = await loginUserAndGenerateToken({ username, password });

        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
