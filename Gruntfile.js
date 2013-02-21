/*
 * grunt-dir2json
 * https://github.com/GuardianInteractive/grunt-dir2json
 *
 * Copyright (c) 2013 Guardian Interactive team
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp/*'],
		},

		// Configuration to be run (and then tested).
		dir2json: {
			test_01: {
				root: 'test/fixtures/test_01',
				dest: 'tmp/test_01.json'
			},
			test_02: {
				root: 'test/fixtures/test_02',
				dest: 'tmp/test_02.json'
			},
			test_03: {
				root: 'test/fixtures/test_03',
				dest: 'tmp/test_03.json'
			},
			test_04: {
				root: 'test/fixtures/test_04',
				dest: 'tmp/test_04.json',
				options: {
					exclude: '**/*/README.md'
				}
			},
			test_05: {
				root: 'test/fixtures/test_05/',
				dest: 'tmp/test_05.json'
			}
		},

		// Unit tests.
		nodeunit: {
			tests: ['test/*_test.js'],
		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'dir2json', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
