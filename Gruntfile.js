/* global module:false */

module.exports = function(grunt) {
    "use strict";

    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');

    grunt.registerTask('ci', ['jshint', 'karma:ci']);

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: true
            },
            all: ['Gruntfile.js', 'js/*.js', 'test/**/*.js']
        },

        karma: {
            ci: {
                configFile: 'karma.conf.js',
                background: false,
                singleRun: true,
                browsers: ['PhantomJS']
            },
            unit: {
                configFile: 'karma.conf.js',
                background: true,
                browsers: ['PhantomJS']
            },
            autowatch: {
                configFile: 'karma.conf.js',
                autoWatch: true,
                browsers: ['PhantomJS']
            }
        },

        watch: {
            scripts: {
                files: ['js/**/*.js', 'test/**/*.js'],
                tasks: ['jshint', 'karma:autowatch'],
                options: {
                    spawn: false
                }
            }
        },

        jsdoc: {
            dist: {
                src: ['README.md', 'js/*.js'],
                options: {
                    destination: 'doc',
                    template : "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template"
                }
            }
        }
    });
};
