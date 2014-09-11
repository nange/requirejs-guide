// moduleA
define(['moduleB'], function(moduleB) {
  alert('moduleA is executed!');
  moduleB.say();

  return {
    say: function() {
      alert('moduleA is saying...');
    }
  };
});