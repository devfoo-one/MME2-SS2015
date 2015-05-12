/**
 * MME2 - Uebung 03 - Tom Oberhauser 798158
 * Tasks:
 * [ ] execute frisby test
 * [x] minify server.js
 * [x] copy minified server.js into folder build
 * [] copy src/public into folder build
 */

/**
 * USE grunt-jasmine-node and grunt-copy
 */

module.exports = function(grunt) {
    // initialize configObject
    grunt.config.init({
        /**
         * read package specs from package.json
         */
        pkg: grunt.file.readJSON('package.json'),

        /**
         * concatenation of all .js files into one file
         * (not really necessary here since i only have one file...)
         */
        concat: {
            dist: {
                src: 'src/*.js', //source files
                dest: 'build/<%= pkg.name %>.js' //destination files, filename taken out of package.json
            }
        },

        /**
         * configure minification
         */
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                sourceMap: true,
                compress: {}, //must be empty object, not true https://github.com/gruntjs/grunt-contrib-uglify/issues/298
                mangle: {}
            },
            dist: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'] //minify concat output
                }
            }
        },

        /**
         * test configuration
         */
        frisby: {
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec'
            },
            all: ['spec/']
        },

        /**
         * grunt-copy
         */
        copy: {
            main: {
                  expand: true,
                  src: 'src/public/**',
                  dest: 'build/public/'
            },
        }
    });
    /**
     * load required grunt-modules. These should have been installen through npm
     */
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-copy');
    grunt.registerTask('test',['frisby']);
    grunt.registerTask('default', ['concat','uglify']);
    // grunt.registerTask('default', ['concat','uglify','copy']);
};
