const fs = require('fs/promises');

const HTTP_NO_CONTENT = 204;
const TALKERS_FILE = './talker.json';

const deleteTalker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const talkersList = JSON.parse(await fs.readFile(TALKERS_FILE));
    const talkerIndex = talkersList.findIndex((t) => +t.id === +id);
    talkersList.splice(talkerIndex, 1);
    await fs.writeFile(TALKERS_FILE, JSON.stringify(talkersList));
    return res.status(HTTP_NO_CONTENT).end();
  } catch (error) {
    next(error);
  }
};

module.exports = deleteTalker;