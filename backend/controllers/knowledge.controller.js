import Facts from '../models/facts.js';
import Rules from '../models/rules.js';
import Devices from '../models/devices.js';
import { search, specs} from '../services/techSpecs.js';
import { httpError } from '../helpers/handleError.js';

export const getRules = async (req, res) => {
    try {

        // getting the rules from the DB
        const rules = await Rules.find({}, "_id content") 
        console.log(rules)

        // getting only the content of the rules
        //const rules = rulesDB.map((r) => (r.content));

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

export const deleteRule = async (req, res) => {
  try {
      const {id} = req.params;

      if(!id) return res.status(400).json({message: 'The id is required'});

      await Rules.findByIdAndRemove(id);

      res.status(200).send();
  } catch (error) {
      httpError(res, error);
  }
}

export const getDevices = async (req, res) => {
    try {

        // getting the devices from the DB
        const devicesDB = await Devices.find({}, "model price") 
        console.log(devicesDB)

        // getting only the name and price of the devices
        const devices = devicesDB.map((f) => ({id: f._id, name: f.model, price: f.price}));

        res.status(200).json({"devices": devices})
    } catch (error) {
        httpError(res, error);
    }
}

export const searchDevice = async (req, res) => {
    try {
        const input = req.params.name;

        const decodeInput = input.replace(' ', '%20')

        const devices = await search(decodeInput)

        res.status(200).json(devices);

    } catch (error) {
        httpError(res, error);
    }
}

export const getSpecs = async (req, res) => {
  try {
      const id = req.params.id;

      const response = await specs(id);

      res.status(200).json(response);
  } catch (error) {
      httpError(res, error);
  }
}

export const addDevice = async (req, res) => {
    try {
        const {id, price} = req.body;

        const device = await specs(id);
        
        // creating and saving a new fact
        const newDevice = new Devices({
            model: device.model,
            image: device.image,
            cpu: device.cpu,
            ram: device.ram,
            storage: device.storage,
            display_size: device.displaySize,
            display_type: device.displayType,
            cameras: device.cameras,
            main_camera: device.mainCamera,
            battery: device.battery,
            released: device.released,
            price: price*100,
        });
        console.log(newDevice);
        await newDevice.save();

        // sending the new fact
        res.status(200).send();
    } catch (error) {
        httpError(res, error);
    }
}

export const deleteDevice = async (req, res) => {
    try {
        const {id} = req.params;

      if(!id) return res.status(400).json({message: 'The id is required'});

      await Devices.findByIdAndRemove(id);
      
      res.status(200).send();
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