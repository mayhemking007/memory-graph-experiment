import {convData} from "../../data/conversation/data.js"
import { prisma } from "../../db/prisma.js"
import { ingestProcessor } from "./ingest.processor.js";

export const ingestData = async () => {
    
    for(const data of convData) {
        const role = data.role == "user" ? 'USER' : 'ASSISTANT';
        const message = await prisma.message.create({
            data : {
                content : data.content,
                role : role,
                conv_id : data.conv_id,
                position : parseInt(data.id),
            }
        });
        const embedding = await ingestProcessor(message);
        await prisma.$queryRawUnsafe(`UPDATE "Message" 
            SET embedding = '${embedding}'::vector
            WHERE id = '${message.id}'`);
        
    }
}


