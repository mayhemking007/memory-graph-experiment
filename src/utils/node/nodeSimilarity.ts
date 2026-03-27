import { prisma } from "../../db/prisma.js";

export const nodeSimilarity = async (nodeAId : string, nodeBId : any) => {
    try{
        const score : any = await prisma.$queryRawUnsafe(`SELECT
            1 - (n1.embedding <=> n2.embedding) AS similarity
            FROM "Node" n1, "Node" n2
            WHERE n1.id = $1 AND
            n2.id = $2
            `,nodeAId, nodeBId);
        return score[0].similarity;
    }
    catch(e){
        console.log(e);
        throw e;
    }
}