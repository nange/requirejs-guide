// moduleB
define(['moduleC'], function(moduleC) {
  alert('moduleB is executed!');
  moduleC.say();

  return {
    say: function() {
      alert('moduleB is saying...');
    }
  };
});