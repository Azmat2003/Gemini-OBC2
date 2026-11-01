import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

export async function askGemini(chats){

    const content = chats.map((msg)=>{
        return {
            role : msg.role,
            parts : [{text : msg.data}]
        }
    })

    const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash-lite',
        contents: content,
    });
    console.log(response.text);

    return response.text;
}

// async function main() {
//   const interaction = await ai.interactions.create({
//     model: "gemini-3.8-flash",
//     input: "How does AI work?",
//   });
//   console.log(interaction.output_text);
// }

// main();