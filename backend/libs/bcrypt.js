import bcrypt from 'bcryptjs';

export const generateUniqueKey = () => {
  
  const saltRounds = 3;
  const uniqueKey = bcrypt.genSaltSync(saltRounds);

  return uniqueKey;
}