import { NextFunction, Request, Response } from 'express';
import { createUser } from '../services/user';
import {
    getUser,
    loginUser as loginUserAndGenerateToken,
} from '../services/auth';

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

        console.log('Logging in with', username, password);

        const { token, id } = await loginUserAndGenerateToken({
            username,
            password,
        });

        return res
            .status(200)
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            })
            .json({
                message: 'Log in successful',
                data: { token, id, username },
            });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const logoutUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return res
            .status(200)
            .clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            })
            .json({ message: 'Log out succesful' });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const reqUser = req.user;

        if (!reqUser || !reqUser.userId || !reqUser.username) {
            throw new Error('Not authenticated');
        }

        const user = await getUser(reqUser.username);

        return res.status(200).json({
            data: {
                userId: user.userId,
                username: user.username,
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};
