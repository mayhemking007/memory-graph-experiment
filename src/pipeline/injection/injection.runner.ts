import { injectionConfig } from "../../config/injection.config.js";
import { prisma } from "../../db/prisma.js";
import { expandGraph } from "../../utils/injection/expandGraph.js";
import { generateInjectionContext } from "../../utils/injection/generateInjectionContext.js";
import { getKeyMessages } from "../../utils/injection/getKeyMessages.js";
import { injectionProcessor } from "./injection.processor.js";

export const injectionRunner = async (nodeIds : string[]) => {
    const hops = injectionConfig.hop;
    try{
        // const choosenNodes = await prisma.node.findFirst({
        //     where : {id : {in : nodeIds}},
        //     select : {id : true}
        // });
        // console.log("Choosen nodes: ", choosenNodes);
        const adjNodes = await expandGraph(nodeIds, hops);
        const result : any = [];
        for(const nodeId of adjNodes){
            const keyMessages = await getKeyMessages(nodeId);
            result.push(keyMessages);
        }
        const contextString = generateInjectionContext(result);
        // await injectionProcessor(contextString);
        return contextString;
    }
    catch(e){
        console.log(e);
        throw e;
    }
}