const handleError = (error, ctx) => {
  ctx.response.status = 500;
  ctx.body = {
    message: error.message || 'Internal server error.',
  };
};

module.exports = { handleError };
