import { generateAnswer } from "../../../utils/evaluation/generateAnswers.js"

export const noPrompt = async(query : string) => {
    const answer = await generateAnswer(query, "");
    return answer;
}