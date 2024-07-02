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

        const token = jwt.sign({ username }, env.JWT_SECRET, {
            expiresIn: 300,
        });

        return token;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
