import db from '../db/client';
import { generateEmbedding } from '../lib/embeddings';

interface WorkExperienceData {
    userId: number;
    company: string;
    jobTitle: string;
    startMonth: number;
    startYear: number;
    endMonth?: number;
    endYear?: number;
    details: string[];
}

export const createWorkExperience = async (data: WorkExperienceData) => {
    try {
        // TODO: validate work experience data
        const { details } = data;

        // TODO: this takes a while, consider batching
        const embeddingPromises = details.map((text) =>
            generateEmbedding(text)
        );

        const embeddings = await Promise.all(embeddingPromises);

        return await db.$transaction(async (tx) => {
            const workExperience = await tx.workExperience.create({
                data: {
                    userId: data.userId,
                    company: data.company,
                    jobTitle: data.jobTitle,
                    startMonth: data.startMonth,
                    startYear: data.startYear,
                    endMonth: data.endMonth,
                    endYear: data.endYear,
                },
            });

            const detailInsertions = data.details.map((text, i) => {
                return tx.$executeRaw`
                INSERT INTO experience_details ("userId", "workExperienceId", "text", "embedding")
                VALUES (${data.userId}, ${workExperience.id}, ${text}, ${embeddings[i]}::vector(384))`;
            });

            await Promise.all(detailInsertions);

            return workExperience;
        });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
