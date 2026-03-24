import type { driftStateConfig } from "../../config/driftState.config.js"
import { cosineSimilarity } from "../../utils/drift/cosineSimilarity.js"
import { avg } from "../../utils/drift/vectorAvg.js"

export type driftState = {
    window : number[][],
    currentSegmentStart : number,
    topic_order : number 
}

export const createInitialDriftState = () : driftState => {
    return {
        window : [],
        currentSegmentStart : 1,
        topic_order : 1
    }
}

export const driftService = (state : driftState, message : {embedding : number[], position : number}, config : typeof driftStateConfig) : {
    state : driftState,
    isDrift : boolean,
    segment? : {
      start : number,
      end : number,
      topicOrder : number,
      driftScore : number  
    }
} => {

    const newWindow = [...state.window, message.embedding];
    if(newWindow.length < config.minMessage){
        return {
            state : {...state, window : newWindow},
            isDrift : false
        }
    }
    const half = config.windowSize/2;
    const prev = newWindow.slice(0, half);
    const curr = newWindow.slice(half);
    const prevAvg = avg(prev);
    const currAvg = avg(curr);

    const drift = 1 - cosineSimilarity(prevAvg, currAvg);

    if(drift > config.threshold){
        return{
            state : {
                window : [],
                currentSegmentStart : message.position,
                topic_order : state.topic_order + 1 
            },
            isDrift : true,
            segment : {
                start : state.currentSegmentStart,
                end : message.position - 1,
                topicOrder : state.topic_order,
                driftScore : drift
            }
        }
    }

    return {
        state : {...state, window : newWindow},
        isDrift : false
    }
}