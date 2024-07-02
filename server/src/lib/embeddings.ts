import { HfInference } from '@huggingface/inference';
// import { config } from 'dotenv';

// config();

const hf = new HfInference(process.env.HF_API_KEY);

function dotProduct(a: number[], b: number[]): number {
    let result = 0;

    if (a.length !== b.length) {
        throw new Error('Vectors must have the same length');
    }

    for (let i = 0; i < a.length; i++) {
        result += a[i] * b[i];
    }

    return result;
}

function is1DArray<T>(object: (T | T[] | T[][])[]): object is T[] {
    return !Array.isArray(object[0]);
}

export async function generateEmbedding(text: string): Promise<number[]> {
    return (await hf.featureExtraction({
        model: 'avsolatorio/GIST-small-Embedding-v0',
        inputs: text,
    })) as number[];
}
