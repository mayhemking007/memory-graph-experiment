import { injectionConfig } from "../../config/injection.config.js";
import { prisma } from "../../db/prisma.js";
import { expandGraph } from "../../utils/injection/expandGraph.js";

export const injectionRunner = async (nodeIds : string[]) => {
    const hops = injectionConfig.hop;
    const buffer = injectionConfig.buffer;
    try{
        const choosenNodes = await prisma.node.findFirst({
            where : {id : {in : nodeIds}}
        });
        const adjNodes = expandGraph(choosenNodes, hops);
        console.log(adjNodes);
        
    }
    catch(e){
        console.log(e);
        throw e;
    }
}