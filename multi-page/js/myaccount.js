require(['config'], function() {
require(['jquery', 'page1', 'page2'],
function($, page1, page2) {
  //dom ready
  $(function() {
    //init pages
    page1();
    page2();

    console.log('Expected results(you should know why?):');
    console.log('page1 bind change on input...');
    console.log('page1 bind change on select...');
    console.log('moduleA is doing...');
    console.log('page1 do something...');
    console.log('page2 bind change on input...');
    console.log('page2 bind change on select...');
    console.log('moduleB is doing...');
    console.log('page2 do something...');
  });

});
});
