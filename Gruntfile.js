/*global module:false*/

/*Generated initially from grunt-init, heavily inspired by yo webapp*/

module.exports = function(grunt) {
  'use strict';

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt config
  require('load-grunt-config')(grunt, {
    init: true,
    data: {
      config: {
        // Configurable paths
        app: 'app',
        dist: 'dist'
      }
    }
  });
 //  grunt.initConfig({
 //   surge: {
 //     'portfolio-go': {
 //       options: {
 //         project: 'dist/',
 //         domain: 'portfolio-go.surge.sh'
 //       }
 //     }
 //   }
 // });
 // grunt.loadNpmTasks('grunt-surge');
 // grunt.registerTask('deploy', ['surge']);
};
