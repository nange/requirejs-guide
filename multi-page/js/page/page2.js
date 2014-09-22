define(['jquery', 'moduleB'], 
function($, moduleB) {

  function bindChangeOnInput() {
    alert('page2 bind change on input...');
  }

  function bindChangeOnSelect() {
    alert('page2 bind change on select...');
  }

  function doSth() {
    moduleB.do();
    alert('page2 do something...');
  }

  return function() {
    bindChangeOnInput();
    bindChangeOnSelect();
    doSth();
  };

});
