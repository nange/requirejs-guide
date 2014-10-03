requirejs.config({
  baseUrl: 'js',

  paths: {
    jquery: 'lib/jquery-1.11.1',
    underscore: 'lib/underscore-min',
    plugTest: 'lib/jquery.plugTest',

    personInfo: 'page/personInfo',
    shippingAddress: 'page/shippingAddress',
    paymentInfo: 'page/paymentInfo',
    orderInfo: 'page/orderInfo',

    header: 'module/header',
    footer: 'module/footer',
    moduleA: 'module/moduleA',
    moduleB: 'module/moduleB',
    ModuleC: 'module/ModuleC'

  },

  shim: {
    'underscore': {
      exports: '_'
    },
    'plugTest': {
      deps: ['jquery'],
      exports: 'jQuery.fn.plugTest'
    }
  }

});
