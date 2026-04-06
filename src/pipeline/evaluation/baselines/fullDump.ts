import { convData } from "../../../data/conversation/data.js"
import { generateAnswer } from "../../../utils/evaluation/generateAnswers.js";

export const fullDump = async (query : string) => {
    let context = "";
    for(const d of convData){
        context += d.content + '\n';
    }
    const answer = await generateAnswer(query, context);
    return answer;
}