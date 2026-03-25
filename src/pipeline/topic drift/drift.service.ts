import type { driftStateConfig } from "../../config/driftState.config.js"
import { cosineSimilarity } from "../../utils/drift/cosineSimilarity.js"
import { avg } from "../../utils/drift/vectorAvg.js"

export type driftState = {
    window : number[][] ,
    currentSegmentStart : string,
    lastMessageId : string | null,
    topic_order : number 
}

export const createInitialDriftState = (firstMessageId : string) : driftState => {
    return {
        window : [],
        currentSegmentStart : firstMessageId,
        lastMessageId : null,
        topic_order : 1
    }
}

export const driftService = (state : driftState, message : {embedding : number[], position : number, id : string}, config : typeof driftStateConfig) : {
    state : driftState,
    isDrift : boolean,
    segment? : {
      start : string,
      end : string,
      topicOrder : number,
      driftScore : number  
    }
} => {

    const newWindow = state.window.length >= config.windowSize ? [...state.window.slice(1), message.embedding] : [...state.window, message.embedding];
    if(newWindow.length < config.minMessage){
        return {
            state : {...state, window : newWindow, lastMessageId : message.id},
            isDrift : false
        }
    }
    const half = config.windowSize/2;
    const prev = newWindow.slice(0, half);
    const curr = newWindow.slice(half);
    const prevAvg = avg(prev);
    const currAvg = avg(curr);

    const drift = 1 - cosineSimilarity(prevAvg, currAvg);

    if(drift > config.threshold && state.lastMessageId){
        return{
            state : {
                window : [],
                currentSegmentStart : message.id,
                lastMessageId : message.id,
                topic_order : state.topic_order + 1 
            },
            isDrift : true,
            segment : {
                start : state.currentSegmentStart,
                end : state.lastMessageId,
                topicOrder : state.topic_order,
                driftScore : drift
            }
        }
    }

    return {
        state : {...state, window : newWindow, lastMessageId : message.id},
        isDrift : false
    }
}