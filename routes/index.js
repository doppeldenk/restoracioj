const Router = require('koa-router');

const router = new Router();

const restaurantsRouter = require('./restaurantsRouter');

router.use('/restaurants', restaurantsRouter);

module.exports = router.routes();
