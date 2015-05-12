/**
 * MME2 - Uebung 03 - Tom Oberhauser 798158
 * Tasks:
 * - execute frisby test
 * - minify server.js
 * - copy minified server.js into folder build
 * - copy src/public into folder build
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
            src: 'src/*.js', //source files
            dest: 'build/<%= pkg.name %>.js' //destination files, filename taken out of package.json
        },

        /**
         * configure minification
         */
        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'build/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>'] //minify concat output
                }
            }
        }
    });
    /**
     * load required grunt-modules. These should have been installen through npm
     */
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat','uglify']);
};
