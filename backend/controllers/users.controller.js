import Users from '../models/users.js';

export const userCounter = async (req, res) => {
    try {
        const usersLen = await Users.estimatedDocumentCount();
        console.log(usersLen)
        //if(usersLen == 0) return res.status(204);
        if(usersLen == 0){
            console.log("no users found");
            return res.status(204).send();
        }
        
        console.log("continue");
        res.status(200).send();

    } catch (error) {
        console.error('error', error);
        res.status(500).json({"error": error});
    }
}

// export const getStarted = async (req, res) => {
//     pass
// }