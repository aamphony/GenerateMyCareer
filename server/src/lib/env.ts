import { z } from 'zod';
import { config } from 'dotenv';

config();

const envSchema = z.object({
    PORT: z.coerce.number(),
    DATABASE_URL: z.string(),
    HF_API_KEY: z.string(),
    JWT_SECRET: z.string(),
    COOKIE_SECRET: z.string(),
    SALT_ROUNDS: z.coerce.number().min(10).max(15),
    NODE_ENV: z.string().default('development'),
});

const env = envSchema.parse(process.env);

export default env;
