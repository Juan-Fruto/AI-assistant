import Facts from '../models/facts.js';
import Rules from '../models/rules.js';

export const getRules = async (req, res) => {
    try {

        const rulesDB = await Rules.find({}, "content") 
        console.log(rulesDB)

        const rules = rulesDB.map((r) => (r.content));

        res.status(200).json({"rules": rules})
    } catch (error) {
        console.error('error', error);
        res.status(500).json({"error": error})
    }
}

export const addRule = async (req, res) => {
    try {
        const {rule} = req.body;
        
        const newRule = new Rules({content: rule});
        await newRule.save();

        res.status(200).send(rule);
    } catch (error) {
        console.error('error', error);
        res.status(500).json({"error": error})
    }
}

export const getFacts = async (req, res) => {
    try {

        const factsDB = await Facts.find({}, "content") 
        console.log(factsDB)

        const facts = factsDB.map((f) => (f.content));

        res.status(200).json({"facts": facts})
    } catch (error) {
        console.error('error', error);
        res.status(500).json({"error": error})
    }
}

export const adFact = async (req, res) => {
    try {
        const {fact} = req.body;
        
        const newFact = new Facts({content: fact});
        await newFact.save();

        res.status(200).send(fact);
    } catch (error) {
        console.error('error', error);
        res.status(500).json({"error": error})
    }
}