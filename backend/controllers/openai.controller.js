import axios from 'axios';
import {openai} from '../app.js';
import Chats from '../models/chats.js';
import chatSetup, {getSysContent} from '../libs/chatSetup.js';
import { httpError } from '../helpers/handleError.js';

export const sendPrompt = async (req, res) => {
    try {

        const {text, activeChatId} = req.body;
        const chatId = activeChatId.toString();

        console.log(typeof chatId)
        
        const chatsLength = await Chats.countDocuments({chatID: chatId});
        console.log('longitud', chatsLength);

        // config the chat if the chat is empty
        if(chatsLength == 0){
            await chatSetup(chatId);    
        } else {

            //
            const newContent = await getSysContent();

            await Chats.findOneAndUpdate(
                {
                    chatID: chatId,
                    "messages.role": "system"
                },
                {
                    $set: { "messages.$.content": newContent }
                }
            )
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
            temperature: 0.3
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
        httpError(res, error);
    }
}