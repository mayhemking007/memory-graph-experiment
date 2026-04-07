import { queryData } from "../../data/queries/queryData.js";
import { fullDump } from "./baselines/fullDump.js";
import { noPrompt } from "./baselines/noPrompt.js";
import { summaryOnly } from "./baselines/summaryOnly.js";
import { evaluationProcessor } from "./evaluation.processor.js";
import { memoGraph } from "./memo-graph.js";

export const evaluationRunner = async(queries : any[]) => {
    console.log("entered eval")
    
    for(const query of queries){
        let data = [];
        const A = await noPrompt(query);
        data.push({
            variant : "No prompt",
            query : query,
            answer : A
        });
        const B = await fullDump(query);
        data.push({
            variant : "Full Dump",
            query : query,
            answer : B
        });
        const C = await summaryOnly(query);
        data.push({
            variant : "Summary Only",
            query : query,
            answer : C
        });
        const D = await memoGraph(query);
        data.push({
            variant : "Memo Graph",
            query : query,
            answer : D
        });

        const scores = await evaluationProcessor(data);
        console.log(scores);
    }

}

await evaluationRunner(queryData);