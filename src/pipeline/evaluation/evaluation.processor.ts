import { generateScores } from "../../utils/evaluation/generateScores.js";

export const evaluationProcessor = async (answers : any[]) => {
    let scores = [];
    
    for(const answer of answers){
        const score = await generateScores(answer.query, answer.answer);
        scores.push({
            model : answer.variant,
            query : answer.query,
            scores : score
        });
    }
    return scores;
}