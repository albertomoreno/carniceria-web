
var information = require('./controllers/front/information');
var cutter = require('./controllers/front/cutter');
var home = require('./controllers/front/home');
var products = require('./controllers/front/products');


module.exports = function(app) {
  app.use('/contact', information.contact);
  app.use('/about-us', information.about_us);
  app.use('/products', products.products);
  app.use('/cutter', cutter.cutter);
  app.use('/', home.home);
};
