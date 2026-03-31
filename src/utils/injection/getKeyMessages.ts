import { injectionConfig } from "../../config/injection.config.js";
import { prisma } from "../../db/prisma.js";

export const getKeyMessages = async (nodeId : string) => {
    try{
        const node = await prisma.node.findFirst({
            where : {id : nodeId},
            include : {
                segment : true
            }
        });
        if(!node) throw new Error("Cannot find the node in getKeyMessages");
        const borderMessages : any = await prisma.message.findMany({
            where : {id : {in : [node.segment.start_message, node.segment.start_message]}},
            select : {position : true, conv_id : true}
        });
        if(!borderMessages) throw new Error("Cannot find border messages");
        const startMessages = await prisma.message.findMany({
            where : {
                conv_id : borderMessages.conv_id,
                position : {
                    gte : borderMessages[0].position,
                    lte : borderMessages[0].position + injectionConfig.key_messages
                }
            },
            orderBy : {position : "asc"}  
        });
        const endMessages = await prisma.message.findMany({
            where : {
                conv_id : borderMessages.conv_id,
                position : {
                    gte : borderMessages[1].position,
                    lte : borderMessages[1].position + injectionConfig.key_messages
                }
            },
            orderBy : {position : "asc"} ,
            select : {content : true}
        });
        return {
            nodeId : nodeId,
            label : node.label,
            summary : node.summary,
            startMessages : startMessages,
            endMessages : endMessages
        }
    }
    catch(e){
        console.log(e);
        throw e;
    }
}