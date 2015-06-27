/**
 * MME2 - Uebung 05 - Tom Oberhauser 798158
 */


module.exports = function(grunt) {
    // initialize configObject
    grunt.config.init({

        pkg: grunt.file.readJSON('package.json'), // read package specs from package.json

        /**
         * minification
         */
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                sourceMap: false, //create no map file
                compress: {}, //must be empty object, not true https://github.com/gruntjs/grunt-contrib-uglify/issues/298
                mangle: {}
            },
            build: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['src/*.js'] //minify all js files in one file
                }
            }
        },

        /**
         * jasmine_node (frisby) test
         */
        jasmine_node: {
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
            build: {
                files: [{
                    expand: true,
                    src: 'package.json',
                    dest: 'build/'
                }]
            }
        }
    });

    /**
     * load required grunt-modules. These should have been installed through npm
     */
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-jasmine-node');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['jasmine_node', 'uglify', 'copy']); //if jasmine_node fails, everything fails
};
