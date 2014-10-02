define(['jquery', 'moduleA', 'ModuleC'], 
function($, moduleA, ModuleC) {

  function bindChangeOnInput() {
    alert('orderInfo bind change on input...');
  }

  function doSth() {
    moduleA.do();
    var moduleC = new ModuleC('moduleC');
    alert('orderInfo do something...' + moduleC.say());
  }

  return function() {
    bindChangeOnInput();
    doSth();
  };

});
