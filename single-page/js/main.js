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
  });

});
