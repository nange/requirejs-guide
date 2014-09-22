require(['config'], function() {
require(['jquery', 'page3', 'page4'],
function($, page3, page4) {
  //dom ready
  $(function() {
    //init pages
    page3();
    page4();

    console.log('Expected results(you should know why?):');
    console.log('page3 bind change on input...');
    console.log('page3 bind change on select...');
    console.log('moduleB is doing...');
    console.log('page3 do something...I am: moduleC');
    console.log('page4 bind change on input...');
    console.log('page4 bind change on select...');
    console.log('moduleA is doing...');
    console.log('page4 do something...I am: moduleC');
  });

});
});
