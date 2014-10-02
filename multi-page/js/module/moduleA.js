define(['jquery', 'plugTest'], function($, plugTest) {

  return {
    do: function() {
      alert('moduleA is doing...');

      $('body').plugTest();
    }
  };

});
