define(['jquery', 'moduleB', 'ModuleC'], 
function($, moduleB, ModuleC) {

  function bindChangeOnInput() {
    alert('paymentInfo bind change on input...');
  }

  function doSth() {
    moduleB.do();
    var moduleC = new ModuleC('moduleC');
    alert('paymentInfo do something...' + moduleC.say());
  }

  return function() {
    bindChangeOnInput();
    doSth();
  };

});
