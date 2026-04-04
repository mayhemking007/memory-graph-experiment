import { prisma } from "../../db/prisma.js";

export const lastMessage = async (lastMessageId : string) => {
    const current = await prisma.message.findFirst({
        where : {
            id : lastMessageId!   
        },
        select : {position : true, conv_id : true},
    });
    if(!current || current.position == 1) return null;

    const lastMessage = await prisma.message.findFirst({
        where : {
            position : current.position - 1,
            conv_id : current.conv_id
        }
    })
    if(!lastMessage) return null;

    return lastMessage?.id;
}