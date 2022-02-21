const fs = require('fs/promises');

const HTTP_OK = 200;
const TALKERS_FILE = './talker.json';

const searchTalker = async (req, res, next) => {
  try {
    const { q } = req.query; 
    const talkersList = JSON.parse(await fs.readFile(TALKERS_FILE));
    const filteredTalkers = talkersList.filter((talker) => talker.name.includes(q));
    if (!q || q === '') {
      return res.status(HTTP_OK).json(talkersList);
    }
    if (filteredTalkers.length === 0) {
      return res.status(HTTP_OK).json([]);
    }
    return res.status(HTTP_OK).json(filteredTalkers);
  } catch (error) {
    next(error);
  }
};

module.exports = searchTalker;