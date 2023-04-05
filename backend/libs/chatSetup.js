import Chats from '../models/chats.js';
import Rules from '../models/rules.js';
import Facts from '../models/facts.js';

const chatSetup = async (chatId) => {

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
                role: system,
                content: "You are an assist"
            },
            {
                role: "user",
                content: "by default reply in español"
            }
        ]
    });

    rulesSys.save().then(() => (0));
}

export default chatSetup