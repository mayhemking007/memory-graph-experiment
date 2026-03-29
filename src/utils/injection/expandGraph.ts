import { getNeighbors } from "./getNeighbors.js";

export const expandGraph = async (nodes : any, hops : number) => {
    try{
        const visited = new Set<string>(nodes);
        let currentLevel = [...nodes];
        for(let i = 0; i < hops; i++){
            if(currentLevel.length === 0) break;
            const neighbors = await getNeighbors(currentLevel);
            const nextLevel : string[] = [];
            for(const neighbor of neighbors){
                if(!visited.has(neighbor)){
                    nextLevel.push(neighbor);
                    visited.add(neighbor);
                }
            }
            currentLevel = nextLevel;
        }
        return Array.from(visited);
    }
    catch(e){
        console.log(e);
        throw e;
    }
}