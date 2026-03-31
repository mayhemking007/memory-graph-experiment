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
        const startMessage = borderMessages[0];
        const endMessage = borderMessages[1];
        

    }
    catch(e){
        console.log(e);
        throw e;
    }
}