
import { fullDump } from "./baselines/fullDump.js";
import { noPrompt } from "./baselines/noPrompt.js";
import { summaryOnly } from "./baselines/summaryOnly.js";
import { memoGraph } from "./memo-graph.js";

export const evaluationRunner = async(queries : any[]) => {
    
    for(const query of queries){
        let data = [];
        const A = await noPrompt(query);
        data.push({
            variant : "No prompt",
            answer : A
        });
        const B = await fullDump(query);
        data.push({
            variant : "Full Dump",
            answer : B
        });
        const C = await summaryOnly(query);
        data.push({
            variant : "Summary Only",
            answer : C
        });
        const D = await memoGraph(query);
        data.push({
            variant : "Memo Graph",
            answer : D
        });

        // evaluationProcessor(data);
    }

}