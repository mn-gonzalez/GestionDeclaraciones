var express = require('express');
//var router = express.Router();

const app = express();

app.get("/", (req, res) => res.json({message: 'Api para BD de gestion de declaraciones juradas'}))
/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
*/

app.use(require('./login'));
app.use(require('./declaracion'));
//app.use(require('./solicitudes'));
//app.use(require('./deudor'));
//app.use(require('./funcionario'));
//app.use(require('./reportes'));

module.exports = app;
