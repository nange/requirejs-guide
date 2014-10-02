define(['jquery', 'moduleB'], 
function($, moduleB) {

  function bindChangeOnInput() {
    alert('shippingAddress bind change on input...');
  }

  function doSth() {
    moduleB.do();
    alert('shippingAddress do something...');
  }

  return function() {
    bindChangeOnInput();
    doSth();
  };

});
