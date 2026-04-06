import { convData } from "../../../data/conversation/data.js";
import { openai } from "../../../openai/openai.js";
import { generateAnswer } from "../../../utils/evaluation/generateAnswers.js";

export const summaryOnly = async (query : string) => {
    let context = "";
    for(const d of convData){
        context += d.content + '\n';
    }
    const response = await openai.chat.completions.create({
        model : "gpt-4o-mini",
        messages : [
            {
                role : "user",
                content : `Summarize the conversation below and only return summary \n\n ${context}` 
            }
        ]
    });
    const summary = response.choices[0]?.message.content;
    const answer = await generateAnswer(query, summary as string);
    return answer; 
} 