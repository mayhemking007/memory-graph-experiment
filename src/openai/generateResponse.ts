import { promptForNodeLabelAndSummay } from "../config/prompts.js";
import { openai } from "./openai.js"

export const generateResponse = async(context : string) => {

    const systemPrompt = promptForNodeLabelAndSummay;

    const response = await openai.chat.completions.create({
        model : "gpt-4o-mini",
        messages : [
            {
                role : "system",
                content : systemPrompt
            },
            {
                role : "user",
                content : context
            }
        ]
    });

    return response.choices[0]?.message.content?.toString();
}