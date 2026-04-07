import { openai } from "../../openai/openai.js"

export const generateAnswer = async(query : string, context : string) => {
    const response = await openai.chat.completions.create({
        model : "gpt-4o-mini",
        messages : [
            {
                role : "system",
                content : context
            },
            {
                role : "user",
                content : query
            }
        ]
    });
    return response.choices[0]?.message.content;
}