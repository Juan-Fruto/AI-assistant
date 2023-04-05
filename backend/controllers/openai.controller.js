import axios from 'axios';
import {openai} from '../app.js';
import Chats from '../models/chats.js';
import Rules from '../models/rules.js';
import Facts from '../models/facts.js';
import chatSetup from '../libs/chatSetup.js'

export const sendPrompt = async (req, res) => {
    try {

        const {text, activeChatId} = req.body;
        const chatId = activeChatId.toString();

        console.log(typeof chatId)
        
        const chatsLength = await Chats.countDocuments({chatID: chatId});
        console.log('longitud', chatsLength)
        if(chatsLength == 0){
                    
            const rules = await Rules.find({}, "content");
            const facts = await Facts.find({}, "content");
            
            var system = "You are an assist who follows the next facts: ";
            facts.map((f) => system = system + f.content + ". ");

            system = system + " and the next rules: ";
            rules.map((r) => system = system + r.content + ". ");


            const rulesSys = new Chats({
                chatID: chatId,
                messages: [
                    {
                        role: "system",
                        content: system
                    },
                    {
                        role: "user",
                        content: "by default reply in español"
                    }
                ]
            });

            await rulesSys.save();
        }
        
        const messagesDB = await Chats.findOne({chatID: chatId}, 'chatID messages').lean();
        console.log(messagesDB)

        const messages = messagesDB.messages.map(m => ({
            role: m.role,
            content: m.content
        }));
        
        messages.push({
            role: "user",
            content: text
        })

        console.log("mensajessssssss------------------------", messages)
        
        // openai request
        const aiRes = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.5
        });

        // sending the openai response to chat engine
        const chatEngineRes = await axios.post(
            `https://api.chatengine.io/chats/${activeChatId}/messages/`,
            { text: aiRes.data.choices[0].message.content },
            {
                headers: {
                    "Project-ID": process.env.PROJECT_ID,
                    "User-Name": process.env.BOT_USER_NAME,
                    "User-Secret": process.env.BOT_USER_SECRET
                }
            }
        )

        Chats.findOneAndUpdate({chatID: chatId}, {
            $push: {messages: {role: "user", content: text}}
        }).then(() => {
            return Chats.findOneAndUpdate({chatID: chatId}, {
                $push: {messages: {role: "assistant", content: aiRes.data.choices[0].message.content}}
            });
        }).then(() => {
            console.log('the conversation has been updated');
        }).catch((err) => {
            console.error(err);
        });

        console.log(chatEngineRes.data);
        console.log(aiRes.data.choices[0].message.content)

        res.status(200).json({text: text + "😊"});
    } catch (error) {
        console.error('error', error);
        res.status(500).json({error: error.message});
    }
}