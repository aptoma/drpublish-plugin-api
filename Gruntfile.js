/* eslint-env node */
'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.registerTask('ci', ['eslint', 'karma:ci']);

	grunt.initConfig({
		eslint: {
			target: ['Gruntfile.js', 'karma.conf.js', 'js', 'test']
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
				tasks: ['eslint', 'karma:autowatch'],
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
					template: 'node_modules/ink-docstrap/template'
				}
			}
		}
	});
};
