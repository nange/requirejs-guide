define(['jquery', 'moduleA'], 
function($, moduleA) {

  function bindChangeOnInput() {
    alert('page1 bind change on input...');
  }

  function bindChangeOnSelect() {
    alert('page1 bind change on select...');
  }

  function doSth() {
    moduleA.do();
    alert('page1 do something...');
  }

  return function() {
    bindChangeOnInput();
    bindChangeOnSelect();
    doSth();
  };

});
