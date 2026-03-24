import { generateEmbedding } from "../../openai/generateEmbedding.js";
import { normalizeText } from "../../utils/normalizeText.js";

export const ingestProcessor = async (message : any) => {
    const text = message.content;
    const content = normalizeText(text);
    const embedding = await generateEmbedding(content as string);
    
    return embedding;
    
}