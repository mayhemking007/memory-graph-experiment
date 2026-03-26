import { prisma } from "../../db/prisma.js";
import { generateEmbedding } from "../../openai/generateEmbedding.js";
import { generateResponse } from "../../openai/generateResponse.js";

export const nodeProcessor = async (messages : any, segmentId : string) => {
    let messageContent = "";
    let index = 1;
    for(const message of messages){
        messageContent += `Message ${index}: \n[${message.role}] ${message.content}\n\n`;
    }
    try{
        const response = await generateResponse(messageContent);
        const resoponseJson = JSON.parse(response!);
        const {label, summary} = resoponseJson;
        const embedding = await generateEmbedding(summary as string);
        const embeddingString = `[${embedding?.join(",")}]`;

        await prisma.$transaction(async(tsx) => {
            const node = await tsx.node.create({
                data : {
                    segment_id : segmentId,
                    summary : summary,
                    label : label,
                    version : 1
                }
            });
            await tsx.$queryRawUnsafe(`UPDATE "Node"
                SET embedding = '${embeddingString}'
                WHERE id = '${node.id}'`);
        });
    }
    catch(e){
        console.log(e);
        throw e;
    }
}