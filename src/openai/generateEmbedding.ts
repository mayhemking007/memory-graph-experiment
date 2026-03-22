import { openai } from "./openai.js"

export const generateEmbedding = async(text : string) => {
    const embedding = await openai.embeddings.create({
        model : "text-embedding-3-small",
        input : text
    });
    if(!embedding) throw new Error("Error in generating the embedding");
    return embedding.data[0]?.embedding;
}