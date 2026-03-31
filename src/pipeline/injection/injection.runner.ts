import { injectionConfig } from "../../config/injection.config.js";
import { prisma } from "../../db/prisma.js";
import { expandGraph } from "../../utils/injection/expandGraph.js";
import { getKeyMessages } from "../../utils/injection/getKeyMessages.js";

export const injectionRunner = async (nodeIds : string[]) => {
    const hops = injectionConfig.hop;
    try{
        const choosenNodes = await prisma.node.findFirst({
            where : {id : {in : nodeIds}}
        });
        const adjNodes = await expandGraph(choosenNodes, hops);
        console.log(adjNodes);
        const result : any = [];
        for(const nodeId of nodeIds){
            const keyMessages = await getKeyMessages(nodeId)
        }
        
        
    }
    catch(e){
        console.log(e);
        throw e;
    }
}