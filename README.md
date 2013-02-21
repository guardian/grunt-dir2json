# grunt-dir2json

> Flatten a folder to a JSON file representing its contents

Often, your project will depend on data in static files - configs, language files, templates, CSV data, and so on. Loading each of these files separately is a nuisance, and results in unnecessary HTTP requests.

This task combines all those files into a single .json file. For example if you had a folder that looked like this...

```
data
|- config.json
|- tables
   |- population.csv
   |- growth.csv
|- slides
   |- 0.txt
   |- 1.txt
   |- 2.txt
   |- 3.txt
|- i18n
   |- en-GB.json
   |- en-US.json
   |- fr.json
   |- de.json
```

...you would get JSON that looked something like this, except minified:

```js
{
  "config": {
    // contents of config.json
  },
  "tables": {
    "population": // contents of population.csv
    "growth": // contents of growth.csv
  },
  "slides": [
    "contents of 0.txt",
    "contents of 1.txt",
    "contents of 2.txt",
    "contents of 3.txt"
  ],
  "i18n": {
    "en-GB": {
      // contents of en-GB.json
    },
    "en-US": {
      // contents of en-US.json
    },
    "fr": {
      // contents of fr.json
    },
    "de": {
      // contents of de.json
    },
  }
}
```

If a file contains JSON, it is stored as JSON; if not, it is stored as text. If a folder only contains items with numeric filenames (as in the case of the `slides` folder above), it will become an array rather than an object.


## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-dir2json --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-dir2json');
```

## The "dir2json" task

### Overview
In your project's Gruntfile, add a section named `dir2json` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  dir2json: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.exclude
Type: `String` or `Array`

A pattern, or array of patterns, of filenames to exclude, e.g. `**/*/notes.md`. Uses the standard globbing syntax. `.DS_Store` and `Thumbs.db` files will **always** be excluded - you don't need to specify these.

### Usage Examples

#### Default Options
This will read the contents of `project/data` and write a JSON file representing its contents to `project/src/data.json`:

```js
grunt.initConfig({
  dir2json: {
    data: {
      root: 'project/data',
      dest: 'project/src/data.json'
    },
  },
})
```

#### Custom Options
In this (slightly contrived) example, there are two targets - `dev` and `dist`. In both cases .md files will be excluded. In the `dist` target, any files named `debug_hints.json` will also be excluded.

```js
grunt.initConfig({
  dir2json: {
    options: {
      exclude: '**/*.md'
    },
    dev: {
      root: 'project/data',
      dest: 'project/src/data.json'
    },
    dist: {
      options: {
        exclude: '**/*/debug.json'
      },
      root: 'project/data',
      dest: 'project/src/data.json'
    }
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0 - first release
0.1.1 - trailing slashes in 'root' option are now ignored