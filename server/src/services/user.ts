import bcrypt from 'bcrypt';
import env from '../lib/env';
import db from '../db/client';
import { userSchema } from '../schemas/user';

interface CreateUserParams {
    username: string;
    password: string;
}

export const createUser = async (data: CreateUserParams) => {
    try {
        const { username, password } = userSchema.parse(data);

        const existingUser = await db.user.findUnique({
            where: { username },
        });

        if (existingUser) {
            throw new Error('User with that username already exists');
        }

        const hashedPassword = await bcrypt.hash(password, env.SALT_ROUNDS);

        const newUser = await db.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        return newUser;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
