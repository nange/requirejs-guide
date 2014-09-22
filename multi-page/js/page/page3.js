define(['jquery', 'moduleB', 'ModuleC'], 
function($, moduleB, ModuleC) {

  function bindChangeOnInput() {
    alert('page3 bind change on input...');
  }

  function bindChangeOnSelect() {
    alert('page3 bind change on select...');
  }

  function doSth() {
    moduleB.do();
    var moduleC = new ModuleC('moduleC');
    alert('page3 do something...' + moduleC.say());
  }

  return function() {
    bindChangeOnInput();
    bindChangeOnSelect();
    doSth();
  };

});
