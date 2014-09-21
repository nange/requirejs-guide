define(['jquery', 'moduleB'], 
function($, moduleA) {

  function bindChangeOnInput() {
    console.log('bind change on input...');
  }

  function bindChangeOnSelect() {
    console.log('bind change on select...');
  }

  function doSth() {
    moduleA.do();
    console.log('do something...');
  }

  return function() {
    bindChangeOnInput();
    bindChangeOnSelect();
    doSth();
  };

});
