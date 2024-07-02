import { PrismaClient } from '@prisma/client';
import { generateEmbedding } from './embeddings';

const db = new PrismaClient();

export async function getSimilarDetails(text: string): Promise<void> {
    const embedding = await generateEmbedding(text);

    console.log(embedding);

    const res = await db.workExperience.findMany({
        include: {
            experienceDetails: true,
        },
    });

    try {
        const details = await db.$queryRaw`
            SELECT text, (embedding <#> ${embedding}::vector) * -1 AS sim
            FROM experience_details
            WHERE (embedding <#> ${embedding}::vector) * -1 > 0.75
            ORDER BY sim DESC
            LIMIT 10;
        `;

        console.log(details);
    } catch (error) {
        console.log('here');
        console.error(error);
    }
}
