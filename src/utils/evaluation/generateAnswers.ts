import { openai } from "../../openai/openai.js"

export const generateAnswer = async(query : string, context : string) => {
    const resposne = await openai.chat.completions.create({
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
    return resposne.choices[0]?.message.content;
}