import { injectionConfig } from "../../config/injection.config.js";
import { prisma } from "../../db/prisma.js";

export const getNeighbors = async (nodeIds : any) => {
    const neighbors = new Set<string>();
    const threshold = injectionConfig.threshold;
    try{
        const edges = await prisma.edge.findMany({
            where : {
                OR : [
                    {from_node : {in : nodeIds}},
                    {to_node : {in : nodeIds}}
                ]
            }
        });
        const filteredEdges = edges.filter(e => e.type === 'TEMPORAL' || (e.type === 'SEMANTIC' && threshold < e.similarity));
        for(const edge of filteredEdges){
            for(const nodeId of nodeIds){
                if(edge.from_node === nodeId) neighbors.add(edge.to_node);
                else if(edge.to_node === nodeId) neighbors.add(edge.from_node);
            }
        }
        return Array.from(neighbors);
    }
    catch(e){
        console.log(e);
        throw e;
    }
}