import { injectionNodeIds } from "../../config/evaluation.config.js";
import { promptForEvaluation } from "../../config/prompts.js";
import { openai } from "../../openai/openai.js"
import { getNodeContent } from "./getNodeContent.js";

export const generateScores = async(query : string, answer : string) => {
    const nodeData = await getNodeContent(injectionNodeIds);
    const userPrompt = `Evaluate the following:

QUESTION:
${query}

ANSWER:
${answer}

SELECTED MEMORY NODES (ONLY VALID CONTEXT):

${nodeData}

Remember:
- Only the above nodes are valid context
- Do not assume any external knowledge`;


    const response = await openai.chat.completions.create({
        model : "gpt-4o",
        messages : [
            {role : "system", content : promptForEvaluation},
            {role : "user", content : userPrompt}
        ]
    });
    if(!response) throw new Error("Cannot generate scores");
    const result = response.choices[0]?.message.content!.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(result as string);
}