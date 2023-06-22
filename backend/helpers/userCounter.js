import Users from '../models/users.js';

// fn to check if there is no users in the DB
export const areUsers = async (req, res) => {
  try {
      const usersLen = await Users.estimatedDocumentCount();
      console.log(usersLen)
    
      if(usersLen == 0) return false

      return true

  } catch (error) {
      console.log(error)
  }
}