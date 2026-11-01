import { askGemini } from "../services/geminiServices.js";

export const AskQuestion = async (req, res)=>{
    try{
        // Ask the question to LLM (gemini)
        // console.log(req.body);
        const {chats} = req.body;
        // all chat messages to get more relevant answers 

        // call/ask gemini
        const answer = await askGemini(chats);

        // return res
        return res.status(200).json({
            message : "success",
            answer
        })
    }
    catch(err){
        return res.status(500).json({
            message : "Server error",
            error : err.message
        })
    }
}