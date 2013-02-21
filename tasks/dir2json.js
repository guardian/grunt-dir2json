/*
 * grunt-dir2json
 * https://github.com/GuardianInteractive/grunt-dir2json
 *
 * Copyright (c) 2013 Guardian Interactive team
 * Licensed under the MIT license.
 */

/*jslint white: true, plusplus: true */
/*global module, require */

module.exports = function(grunt) {

	'use strict';

	grunt.registerMultiTask('dir2json', 'Flatten a folder to a JSON file representing its contents', function() {
		
		var options, key, root, dest, exclusions, path, result, contentsAreNumeric, removeExclusions, processFile, processDir, getKey;

		// Task config
		options = this.options();

		if ( this.data.options ) {
			for ( key in this.data.options ) {
				if ( this.data.options.hasOwnProperty( key ) ) {
					options[ key ] = this.data.options[ key ];
				}
			}
		}

		options = this.data.options || {};
		root = this.data.root;
		dest = this.data.dest;

		// Exclude .DS_Store, Thumbs.db and any other gubbins specified by the user
		exclusions = [ '**/*/.DS_Store', '**/*/Thumbs.db' ];

		if ( options.exclude ) {
			exclusions = exclusions.concat( options.exclude );
		}

		// Error checking
		if ( !root ) {
			grunt.log.error( 'You must specify a root folder' );
			return false;
		}

		if ( !dest ) {
			grunt.log.error( 'You must specify a destination JSON file' );
			return false;
		}

		if ( !grunt.file.exists( root ) || !grunt.file.isDir( root ) ) {
			grunt.log.error( 'Specified root folder does not exist' );
			return false;
		}


		// No errors, on with the show
		path = require( 'path' );
		result = {};

		// If root has a trailing slash, remove it
		if ( root.substr( -1 ) === path.sep ) {
			root = root.substr( 0, root.length - 1 );
		}


		// Get key from path, e.g. 'project/data/config.json' -> 'config'
		getKey = function ( filepath ) {
			var key = filepath.split( path.sep ).slice( -1 )[0];

			if ( key.lastIndexOf( '.' ) > 0 ) {
				key = key.substr( 0, key.lastIndexOf( '.' ) );
			}

			return key;
		};


		// Test to see whether all contents of a folder have numeric filenames (if so
		// the folder should be converted to an array, not an object)
		contentsAreNumeric = function ( contents ) {
			var i = contents.length;

			if ( !i ) {
				return false;
			}

			while ( i-- ) {
				if ( isNaN( getKey( contents[i] ) ) ) {
					return false;
				}
			}

			return true;
		};


		removeExclusions = function ( item ) {
			var i;

			i = exclusions.length;
			while ( i-- ) {
				if ( grunt.file.isMatch( exclusions[i], item ) ) {
					return false;
				}
			}

			return true;
		};


		processFile = function ( item, indent ) {
			var result, data = grunt.file.read( item );

			try {
				result = JSON.parse( data );
			} catch ( err ) {
				result = data;
			}

			grunt.log.writeln( indent + getKey( item ) );

			return result;
		};


		processDir = function ( dir, indent ) {
			var result, contents, item, i, key, value;

			// Indent is used for logging
			indent = indent || '';

			grunt.verbose.writeln( indent + getKey( dir ) );

			contents = grunt.file.expand( dir + '/*' ).filter( removeExclusions );

			if ( contentsAreNumeric( contents ) ) {
				result = [];
			} else {
				result = {};
			}

			i = contents.length;
			while ( i-- ) {
				item = contents[i];
				key = getKey( item );

				if ( grunt.file.isDir( item ) ) {
					value = processDir( item, indent + '  -> ' );

					// let grunt deal with errors
					if ( value === false ) {
						return false;
					}
				} else {
					value = processFile( item, indent + '  -> ' );
				}

				// if this property already exists, throw an error
				if ( result[ key ] ) {
					grunt.log.error( 'You cannot have multiple files or directories with the same name (extensions are ignored) - failed at ' + item );
					return false;
				}

				result[ key ] = value;
			}

			return result;
		};


		result = processDir( root );

		if ( result === false ) {
			return false;
		}

		grunt.log.writeln( 'Writing file ' + dest );
		grunt.file.write( dest, JSON.stringify( result ) );

	});

};
