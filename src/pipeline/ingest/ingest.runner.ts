import { driftStateConfig } from "../../config/driftState.config.js";
import {convData} from "../../data/conversation/data.js"
import { prisma } from "../../db/prisma.js"
import { createSegment } from "../topic drift/createSegment.js";
import { createInitialDriftState, driftService } from "../topic drift/drift.service.js";
import { ingestProcessor } from "./ingest.processor.js";

export const ingestData = async () => {
    let driftState = createInitialDriftState();
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
        const vectorString = `[${embedding?.join(",")}]`;

        await prisma.$queryRawUnsafe(`UPDATE "Message" 
            SET embedding = '${vectorString}'::vector
            WHERE id = '${message.id}'`);
        
        
        const result = driftService(driftState, {embedding : embedding!, position : message.position}, driftStateConfig)
        driftState = result.state;

        if(result.isDrift && result.segment){
            await createSegment(result.segment);
        }
    }
}


