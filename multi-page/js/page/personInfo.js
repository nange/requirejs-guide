define(['jquery', 'moduleA'], 
function($, moduleA) {

  function bindChangeOnInput() {
    alert('personInfo bind change on input...');
  }

  function doSth() {
    moduleA.do();
    alert('personInfo do something...');
  }

  return function() {
    bindChangeOnInput();
    doSth();
  };

});
