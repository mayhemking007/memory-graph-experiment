import { prisma } from "../../db/prisma.js";

export const createSegment = async (segment : {
      start : string,
      end : string,
      topicOrder : number,
      driftScore : number  
    }, conv_id : string) => {
    try{
        const savedSegment = await prisma.segment.create({
            data : {
                start_message : segment.start,
                end_message : segment.end,
                conv_id : conv_id,
                drift_score : segment.driftScore,
                topic_order : segment.topicOrder
            }
        });

    }
    catch(e){
        console.log(e);
        throw e;
    }
}

export const createFinalSegment = async (drift : any, conv_id : string) => {
    try{
        const segment = await prisma.segment.create({
            data : {
                start_message : drift.currentSegmentStart,
                end_message : drift.lastMessageId,
                topic_order : drift.topic_order,
                conv_id : conv_id,
                drift_score : 0
            }
        })
        return segment;
    }
    catch(e){
        console.log(e);
        throw e;
    }
}