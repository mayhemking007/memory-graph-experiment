import { prisma } from "../../db/prisma.js";

export const createSegment = async (segment : {
      start : number,
      end : number,
      topicOrder : number,
      driftScore : number  
    }) => {
    try{
        
    }
    catch(e){
        console.log(e);
        throw e;
    }
}