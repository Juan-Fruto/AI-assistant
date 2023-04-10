import Users from '../models/users.js';

export const userCounter = async (req, res) => {
    try {
        const usersLen = await Users.estimatedDocumentCount();
            
        if(usersLen == 0) return res.status(204);

        res.status(100);

    } catch (error) {
        console.error('error', error);
    }
}

export const getStarted = async (req, res) => {
    pass
}