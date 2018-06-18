const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const helmet = require('koa-helmet');
const routes = require('./routes');

const app = new Koa();
const port = 3001;

app.use(bodyParser());
app.use(helmet());
app.use(routes);
app.listen(port, () => console.log('Listening on port 3001'));
