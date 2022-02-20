const TOKEN_NOT_FOUND = { message: 'Token não encontrado' };
const INVALID_TOKEN = { message: 'Token inválido' };

const HTTP_UNAUTHORIZED = 401;
const TOKEN = '7mqaVRXJSp886CGr';

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization === '') {
    return res.status(HTTP_UNAUTHORIZED).json(TOKEN_NOT_FOUND);
  }
  if (authorization !== TOKEN) {
    return res.status(HTTP_UNAUTHORIZED).json(INVALID_TOKEN);
  }
  next();
};

module.exports = validateToken;