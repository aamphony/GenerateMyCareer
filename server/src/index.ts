import express from 'express';
import authRouter from './routes/auth';
import env from './lib/env';
import errorHandler from './middleware/errorHandler';

import jwt from 'jsonwebtoken';

const PORT = env.PORT;

const app = express();

app.use(express.json());
app.use('/api/auth', authRouter);

// app.get('/', async (req, res) => {
//     const { text } = req.body;

//     if (!text) {
//         return res.status(400).send('Text is required');
//     }

//     // const embedding = await generateEmbedding(text);

//     const embeddingToCompare = await generateEmbedding(
//         'That is a happy person'
//     );

//     fs.writeFileSync('embedding.txt', JSON.stringify(embeddingToCompare));

//     console.log(embeddingToCompare);

//     // const newDetail = await db.$executeRaw`INSERT INTO experience_details
//     //     (text, embedding, "userId")
//     //     VALUES (${text}, ${embedding}::vector(384), 1)
//     // `;

//     return res.status(200).send('Success');
// });

app.get('/protected', async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    console.log(token);

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        res.status(200).json(decoded);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
