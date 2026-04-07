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
            where : {id : {in : [node.segment.start_message, node.segment.end_message]}},
            select : {id : true,position : true, conv_id : true}
        });
        if(!borderMessages) throw new Error("Cannot find border messages");

        const messageMap = new Map(borderMessages.map((msg : any) => [msg.id, msg]));

        const startMsg : any = messageMap.get(node.segment.start_message);
        const endMsg : any = messageMap.get(node.segment.end_message);

        if (!startMsg || !endMsg) {
            throw new Error("Start or End message not found");
         }

        const startMessages = await prisma.message.findMany({
            where : {
                conv_id : startMsg.conv_id,
                position : {
                    gte : startMsg.position,
                    lte : startMsg.position + injectionConfig.key_messages   
                }
            },
            orderBy : {position : "asc"},
            select : {content : true, role : true, id : true}
        });
        
        const endMessages = await prisma.message.findMany({
            where : {
                conv_id : endMsg.conv_id,
                position : {
                    gte : endMsg.position - injectionConfig.key_messages,
                    lte : endMsg.position
                }
            },
            orderBy : {position : "asc"} ,
            select : {content : true, role : true, id : true}
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