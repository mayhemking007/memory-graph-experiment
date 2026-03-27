import { prisma } from "../../db/prisma.js";
import { edgeRunner } from "../edge/edge.runner.js";
import { nodeProcessor } from "./node.processor.js";

export const nodeRunner = async(segment : any) => {
    const startId = segment.start_message;
    const endId = segment.end_message;
    const conv_id = segment.conv_id;
    try{
        const startMessage = await prisma.message.findFirst({
            where : {
                id : startId
            }
        });
        const endMessage = await prisma.message.findFirst({
            where : {
                id : endId
            }
        });
        const messages = await prisma.message.findMany({
            where : {
                conv_id : conv_id,
                position : {
                    gte : startMessage!.position,
                    lte : endMessage!.position
                }
            }, 
             orderBy: {
                position: 'asc',
            },
        });
        const node = await nodeProcessor(messages, segment.id as string);
        await edgeRunner(node, segment.topic_order);
    }
    catch(e){
        console.log(e);
        throw new Error("Error in generating node.");
    }
}
