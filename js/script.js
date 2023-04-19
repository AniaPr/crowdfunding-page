import Home from './components/Home.js';
import Product from './components/Product.js';

const app = {
  init: function () {
    const thisApp = this;

    thisApp.home = new Home();
    thisApp.products = new Product();
  },
};

app.init();
