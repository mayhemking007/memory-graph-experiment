import { prisma } from "../../db/prisma.js";
import { nodeSimilarity } from "../../utils/node/nodeSimilarity.js";
import { edgeProcessor } from "./edge.processor.js";

export const edgeRunner = async (node : any, topic_order : number) => {
    let prevNode = null;
    try{
        if(topic_order > 1){
            const prevSegment = await prisma.segment.findFirst({
                where : {topic_order : topic_order - 1}
            });
            prevNode = await prisma.node.findFirst({
                where : {segment_id : prevSegment!.id}
            });
        }
        if(prevNode){
            const temporalSimilarity = await nodeSimilarity(prevNode.id, node.id);
            console.log(`temporal similarity = ${temporalSimilarity}`);
            await prisma.edge.create({
                data : {
                    from_node : node.id,
                    to_node : prevNode.id,
                    similarity : temporalSimilarity,
                    type : 'TEMPORAL'
                }
            });
        }
        console.log("after prevNode")
        await edgeProcessor(node);
    }
    catch(e){
        console.log(e);
        throw e;
    }
}