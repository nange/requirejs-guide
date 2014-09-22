define(['jquery'], 
function($) {

  function ModuleC(name) {
    this.name = name;
  }

  ModuleC.prototype.say = function() {
    return 'I am: ' + this.name;
  };

  return ModuleC;

});