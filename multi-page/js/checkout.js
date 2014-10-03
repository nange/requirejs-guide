require(['config'], function() {
require(['jquery', 'header', 'footer', 'paymentInfo', 'orderInfo'],
function($, header, footer, paymentInfo, orderInfo) {
  //dom ready
  $(function() {
    //init comm module
    header();
    footer();

    //init pages
    paymentInfo();
    orderInfo();

    console.log('Expected results(you should know why?):');
    console.log('header is ok...');
    console.log('footer is ok...');
    console.log('paymentInfo bind change on input...');
    console.log('moduleB is doing...');
    console.log('just use underscore to test shim config...');
    console.log('paymentInfo do something...I am: moduleC');
    console.log('orderInfo bind change on input...');
    console.log('moduleA is doing...');
    console.log('just test jquery plug function...');
    console.log('orderInfo do something...I am: moduleC');
  });

});
});
