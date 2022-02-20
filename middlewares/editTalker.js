const fs = require('fs/promises');

const HTTP_OK = 200;
const TALKERS_FILE = './talker.json';

const editTalker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    const talkersList = JSON.parse(await fs.readFile(TALKERS_FILE));
    const talkerIndex = talkersList.findIndex((t) => +t.id === +id);
    const newTalker = { id: +id, name, age, talk };
    talkersList[talkerIndex] = newTalker;
    await fs.writeFile(TALKERS_FILE, JSON.stringify(talkersList));
    return res.status(HTTP_OK).json(newTalker);
  } catch (error) {
    next(error);
  }
};

module.exports = editTalker;