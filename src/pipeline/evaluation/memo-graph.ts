import { injectionNodeIds } from "../../config/evaluation.config.js"
import { generateAnswer } from "../../utils/evaluation/generateAnswers.js";
import { injectionRunner } from "../injection/injection.runner.js"

export const memoGraph = async (query : string) => {
    const context = await injectionRunner(injectionNodeIds);
    const answer = await generateAnswer(query, context);
    return answer;
}