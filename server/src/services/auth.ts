import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/client';
import env from '../lib/env';
import { userSchema } from '../schemas/user';

interface LoginUserParams {
    username: string;
    password: string;
}

export const loginUser = async (data: LoginUserParams) => {
    try {
        const { username, password } = userSchema.parse(data);

        const user = await db.user.findUnique({
            where: {
                username,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user.id, username }, env.JWT_SECRET, {
            expiresIn: 600,
        });

        return { token, id: user.id, username };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getUser = async (username: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                username,
            },
        });

        if (!user) {
            throw new Error('User not found');
        }

        return {
            userId: user.id,
            username: user.username,
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
};
