const HTTP_INTERNAL_SERVER_ERROR = 500;

const errorMiddleware = (err, _req, res, _next) => {
  res.status(HTTP_INTERNAL_SERVER_ERROR).json({ error: `Erro: ${err.message}` });
};

module.exports = errorMiddleware;