const handleError = (error, ctx = null) => {
  const { message, statusCode } = error;
  if (ctx) {
    ctx.response.status = statusCode || 500;
    ctx.body = {
      message: message || 'Internal server error',
    };
  } else {
    console.log(error);
  }
};

module.exports = { handleError };
