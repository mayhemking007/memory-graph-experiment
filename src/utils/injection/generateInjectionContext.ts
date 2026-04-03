import { injectionConfig } from "../../config/injection.config.js";
import { systempromptForContextInjection } from "../../config/prompts.js";

export const generateInjectionContext = (data : any[]) => {
    console.log("Generating injection context with data: ", data);

    let context = systempromptForContextInjection;
    for(const d of data){
        const messageMap = new Map<string, any>();
        for(const m of d.startMessages){
            messageMap.set(m.id, m);
        }
        for(const m of d.endMessages){
            messageMap.set(m.id, m);
        }
        const messages = Array.from(messageMap.values()).sort((a, b) => a.position - b.position);
        let messageBlock = ``;
        for(const m of messages){
            const role = m.role === "USER" ? "[User]" : "[Assistant]";
            messageBlock += `${role} ${m.content}\n\n`;
        }
        const tempContext = `-------
        [Topic: ${d.label}]

        Summary: 
        ${d.summary}

        Messages:
        ${messageBlock}
        \n\n`;
        context += tempContext;
    }
    return context;
}