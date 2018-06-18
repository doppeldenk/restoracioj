const handleError = (error, ctx) => {
  console.log(error);
  ctx.response.status = 500;
  ctx.body = {
    message: error.message || 'Internal server error.',
  };
};

module.exports = { handleError };
