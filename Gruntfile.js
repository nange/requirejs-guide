// Grunt configuration.
module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          keepalive: true,
          hostname: '127.0.0.1',
          port: 8080,
          base: '.'
        }
      }
    },

    requirejs: {
      myaccount: {
        options: {
          almond: true,
          wrap: true,
          baseUrl: "./multi-page/js",
          mainConfigFile: "./multi-page/js/config.js",
          findNestedDependencies: true,
          name: "myaccount",
          out: "./multi-page/js/dist/myaccount.js"
        }
      },
      checkout: {
        options: {
          almond: true,
          wrap: true,
          baseUrl: "./multi-page/js",
          mainConfigFile: "./multi-page/js/config.js",
          findNestedDependencies: true,
          name: "checkout",
          out: "./multi-page/js/dist/checkout.js"
        }
      }
    }

  });
 
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['requirejs', 'connect']);
 
};
