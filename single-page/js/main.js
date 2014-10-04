requirejs.config({
    baseUrl: 'js',
    paths: {
      jquery: 'lib/jquery-1.11.1',

      moduleA: 'module/moduleA',
      moduleB: 'module/moduleB',
      moduleC: 'module/moduleC'

    }
});

requirejs(['jquery', 'moduleA'], function($, moduleA) {
  // DOM ready
  $(function() {
    alert('document is ready...');
    moduleA.say();

    console.log('Expected results(you should know why?):');
    console.log('1. moduleC is executed!');
    console.log('2. moduleB is executed!');
    console.log('3. moduleC is saying...');
    console.log('4. moduleA is executed!');
    console.log('5. moduleB is saying...');
    console.log('6. document is ready...');
    console.log('7. moduleA is saying...');
  });

});
