// module C
define(function() {
  alert('moduleC is executed!');

  return {
    say: function() {
      alert('moduleC is saying...');
    }
  };
});