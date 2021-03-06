const TOKEN_NOT_FOUND = { message: 'Token não encontrado' };
const INVALID_TOKEN = { message: 'Token inválido' };

const HTTP_UNAUTHORIZED = 401;

const validateToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || authorization === '') {
      return res.status(HTTP_UNAUTHORIZED).json(TOKEN_NOT_FOUND);
    }
    if (authorization.length !== 16) {
      return res.status(HTTP_UNAUTHORIZED).json(INVALID_TOKEN);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateToken;