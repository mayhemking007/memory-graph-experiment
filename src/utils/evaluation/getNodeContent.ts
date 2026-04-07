import { prisma } from "../../db/prisma.js";

export const getNodeContent = async(ids : string[]) => {
    let context = ``;
    for(const id of ids){
        const node  = await prisma.node.findFirst({
            where : {id : id}
        });
        const temp = `Node Title - ${node?.label}
        Node Summary - ${node?.summary} \n\n`;

        context += temp;
    }
    return context;
}