const handleError = (error, ctx) => {
  console.log(error);
  const { message, statusCode } = error;
  ctx.response.status = statusCode || 500;
  ctx.body = {
    message: message || 'Internal server error',
  };
};

module.exports = { handleError };
