import express from 'express';
import authRouter from './routes/auth';
import env from './lib/env';
import errorHandler from './middleware/errorHandler';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import experienceRouter from './routes/experience';

const PORT = env.PORT;

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET));
app.use('/api/auth', authRouter);
app.use('/api/experience', experienceRouter);

app.get('/protected', async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET);
        console.log(payload);
    } catch (error) {
        console.error(error);
        return res.status(401).send('Unauthorized');
    }

    return res.status(200).json({ message: 'Protected route' });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
