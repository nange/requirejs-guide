define(['jquery', 'plugTest', 'Handlebars'], function($, plugTest, Handlebars) {
  Handlebars.registerHelper('compare', function(old, suggest) {
  	if(old === suggest) {
  		return suggest;	
  	} else {
  		return new Handlebars.SafeString('<span class="address-changed">' + suggest + '</span>');
  	}
  });
  return {
    do: function() {
      alert('moduleA is doing...');

      $('body').plugTest();
    }
  };

});
