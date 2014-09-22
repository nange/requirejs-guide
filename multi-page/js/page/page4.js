define(['jquery', 'moduleA', 'ModuleC'], 
function($, moduleA, ModuleC) {

  function bindChangeOnInput() {
    alert('page4 bind change on input...');
  }

  function bindChangeOnSelect() {
    alert('page4 bind change on select...');
  }

  function doSth() {
    moduleA.do();
    var moduleC = new ModuleC('moduleC');
    alert('page4 do something...' + moduleC.say());
  }

  return function() {
    bindChangeOnInput();
    bindChangeOnSelect();
    doSth();
  };

});
