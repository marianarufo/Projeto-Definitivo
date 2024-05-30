const { decryptedToken } = require('../../utils/token');
require('dotenv').config();


const verifyJwtMaster = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Unset token!' });
  }

  const [, token] = authHeader.split(' ');

  if (token !== process.env.TOKENMASTER) {
    return res.status(200).json({ message: "You are not the Admnistrator!"})
  }
  try {
    const { userId } = await decryptedToken(authHeader);
    req.userId = parseInt(userId);
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }
};

module.exports = verifyJwtMaster;