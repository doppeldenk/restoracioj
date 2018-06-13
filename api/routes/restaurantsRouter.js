const Router = require('koa-router');

const router = new Router();

const {
  create,
  read,
  update,
  del,
} = require('../controllers/restaurantsController');

router.post('/', create);
router.get('/', read);
router.patch('/:id', update);
router.delete('/:id', del);

module.exports = router.routes();
