import Chats from '../models/chats.js';
import Rules from '../models/rules.js';
import Devices from '../models/devices.js';

// setting the rules and facts to the content of the user system
export const getSysContent = async () => {
    const rules = await Rules.find({}, "content");
    const devices = await Devices.find({}, "model price");

    var system = "You are an assist who sells smartphones follows the next rules: '";
    rules.map((r) => system = system + r.content + ". ");
    
    system = system + "' And knows the next smartphones with its prices: '";
    devices.map((d) => system = system + d.model + " $" + (d.price / 100) + ". ");

    return system;
} 


// creating a new chat in the DB and setting the rules and facts by the admin
const chatSetup = async (chatId) => {
    const system = await getSysContent();

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

export default chatSetup