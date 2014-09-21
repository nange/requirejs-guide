require(['config'], function() {
require(['jquery', 'page1', 'page2'],
function($, page1, page2) {
  //dom ready
  $(function() {
    //init pages
    page1();
    page2();
  });

});
});
