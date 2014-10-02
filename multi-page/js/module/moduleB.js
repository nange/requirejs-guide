define(['jquery', 'underscore'], function($, _) {

  return {
    do: function() {
      alert('moduleB is doing...');

      _.each([1], function() {
        alert('just use underscore to test shim config...');
      });
    }
  };

});
