import Facts from '../models/facts.js';
import Rules from '../models/rules.js';
import { httpError } from '../helpers/handleError.js';

export const getRules = async (req, res) => {
    try {

        // getting the rules from the DB
        const rulesDB = await Rules.find({}, "content") 
        console.log(rulesDB)

        // getting only the content of the rules
        const rules = rulesDB.map((r) => (r.content));

        // sending the rules
        res.status(200).json({"rules": rules})
    } catch (error) {
        console.error('error', error);
        res.status(500).json({"error": error})
    }
}

export const addRule = async (req, res) => {
    try {
        const {rule} = req.body;
        
        // creating and saving a new rule
        const newRule = new Rules({content: rule});
        await newRule.save();

        // sending the new rule
        res.status(200).send(rule);
    } catch (error) {
        httpError(res, error);
    }
}

export const getFacts = async (req, res) => {
    try {

        // getting the fats from the DB
        const factsDB = await Facts.find({}, "content") 
        console.log(factsDB)

        // getting only the content of the facts
        const facts = factsDB.map((f) => (f.content));

        res.status(200).json({"facts": facts})
    } catch (error) {
        httpError(res, error);
    }
}

export const addFact = async (req, res) => {
    try {
        const {fact} = req.body;
        
        // creating and saving a new fact
        const newFact = new Facts({content: fact});
        await newFact.save();

        // sending the new fact
        res.status(200).send(fact);
    } catch (error) {
        httpError(res, error);
    }
}