import { convData } from "../../../data/conversation/data.js"
import { generateAnswer } from "../../../utils/evaluation/generateAnswers.js";

export const fullDump = async (query : string) => {
    let context = `The following is a previous conversation the user had. 
Use it to answer their questions. \n`;
    for(const d of convData){
        context += d.content + '\n';
    }
    const answer = await generateAnswer(query, context);
    return answer;
}