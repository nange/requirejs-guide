require(['config'], function() {
require(['jquery', 'header', 'footer', 'personInfo', 'shippingAddress'],
function($, header, footer, personInfo, shippingAddress) {
  //dom ready
  $(function() {
    //init comm module
    header();
    footer();

    //init pages
    personInfo();
    shippingAddress();

    console.log('Expected results(you should know why?):');
    console.log('header is ok...');
    console.log('footer is ok...');
    console.log('personInfo bind change on input...');
    console.log('moduleA is doing...');
    console.log('just test jquery plug function...');
    console.log('personInfo do something...');
    console.log('shippingAddress bind change on input...');
    console.log('moduleB is doing...');
    console.log('just use underscore to test shim config...');
    console.log('shippingAddress do something...');
  });

});
});
