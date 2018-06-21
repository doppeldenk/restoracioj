const Router = require('koa-router');

const router = new Router();

const {
  create,
  read,
  update,
  del,
  getCompetitors,
} = require('../controllers/restaurantsController');

router.post('/', create);
router.get('/:id', read);
router.get('/:id/competitors', getCompetitors);
router.get('/', read);
router.patch('/:id', update);
router.delete('/:id', del);

module.exports = router.routes();
