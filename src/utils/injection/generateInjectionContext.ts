import { injectionConfig } from "../../config/injection.config.js";

export const generateInjectionContext = (data : any[]) => {
    const startingMsg = data.map((m) => '#1- ' + m.startMessages + '\n');
    const endingMsg = data.map((m) => '#1- ' + m.endMessages + '\n');
    let context = ``;
    for(const d of data){
        const tempContext = `Topic Label - ${d.label} \nTopic Summary - \n${d.summary}\n
        Starting ${injectionConfig.key_messages} messages - \n${startingMsg}\n
        Ending ${injectionConfig.key_messages} messages - \n${endingMsg}`;
        context += tempContext;
    }
    return context;
}