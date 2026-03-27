import { prisma } from "../../db/prisma.js";
import { generateEmbedding } from "../../openai/generateEmbedding.js";

export const edgeProcessor = async (node : any) => {
    try{
        console.log("enter edge processor")
        const embed = await generateEmbedding(node.summary);
        const vectorString = `[${embed?.join(",")}]`;

        const sematicNodes : any[] = await prisma.$queryRawUnsafe(`SELECT id,
            1 - (embedding <=> $1::vector) AS similarity
            from "Node"
            WHERE id != $2
            AND 1 - (embedding <=> $1::vector) > 0.6
            ORDER BY embedding <=> $1::vector 
            LIMIT 3;
            `, vectorString, node.id);

        if(!sematicNodes) return;

        console.log("after top 3 semantic query")

        const dataSave = sematicNodes.map((sn) => ({
            from_node : node.id as string,
            to_node : sn.id as string,
            similarity : sn.similarity,
            type : 'SEMANTIC' as any
        }));

        await prisma.edge.createMany({
            data : dataSave
        });
        console.log("semantic edges saved")
        
    }
    catch(e){
        console.log(e);
        throw e;
    }
}