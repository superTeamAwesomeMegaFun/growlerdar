module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    banner: '/**\n' +
    '<%= pkg.title %> - <%= pkg.version %>\n' +
    '<%= pkg.homepage %>\n' +
    'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
    'License: <%= pkg.license %>\n' +
    '*/\n',

    dir: {
      js: 'js',
      css: 'css',
      sass: 'css/sass',
      img: 'img'
    },

    svgmin: {
      options: {
        plugins: [{
            // Prevent removing the viewBox attr. Previously caused issues in IE9+.
            removeViewBox: false
        }]
      },
      dist: {
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: '<%= dir.img %>/', // Src matches are relative to this path.
          src: ['**/*.svg'], // Actual pattern(s) to match.
          dest: '<%= dir.img %>/', // Destination path prefix.
        }],
      }
    },

    imagemin: {
      dist: {
        options: {
            optimizationLevel: 3,
            progressive: true
        },
        files: [{
          expand: true, // Enable dynamic expansion.
          cwd: '<%= dir.img %>/', // Src matches are relative to this path.
          src: '{,*/}*.{png,jpg,jpeg}', // Actual pattern(s) to match.
          dest: '<%= dir.img %>/', // Destination path prefix.
        }],
      }
    },

    svg2png: {
      dist: {
        files: [{
          src: ['<%= dir.img %>/**/*.svg'],
        }],
      }
    },

    jshint: {
      gruntfile: 'Gruntfile.js',
      files: ['<%= dir.js %>/src/**/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    concat: {
      options: {
        stripBanners: true,
        banner: '<%= banner %>'
      },
      js: {
        src: '<%= jshint.files %>',
        dest: '<%= dir.js %>/<%= pkg.name %>.js'
      },
    },

    sass: {

      // Development options
      dev: {
        options: {
          style: 'expanded',
          // sourcemap: true, // Requires Sass 3.3.0 alpha: `sudo gem install sass --pre`
          trace: true,
          debugInfo: true
        },
        files: {
          '<%= dir.css %>/<%= pkg.name %>.css': '<%= dir.sass %>/global.scss'
        }
      },

      // Distribution options
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= dir.css %>/<%= pkg.name %>.css': '<%= dir.sass %>/global.scss'
        }
      }
    },

    react: {
      jsx: {
        files: [{
          expand: true,
          cwd: 'public/javascripts/src',
          src: '**/*.jsx',
          dest: 'public/javascripts/build',
          ext: '.js'
        }]
      }
    },

    uglify: {

      // Uglify options
      options: {
        banner: '<%= banner %>'
      },

      // Minify js files in js/src/
      dist: {
        src: ['<%= concat.js.dest %>'],
        dest: '<%= dir.js %>/<%= pkg.name %>.min.js'
      },
    },

    clean: {
      // Nothing yet!
    },

    watch: {

      // JShint Gruntfile
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile'],
      },

      // Compile Sass dev on change
      sass: {
        files: '<%= dir.sass %>/**/*',
        tasks: ['sass:dev'],
      },

      // JShint, concat + uglify JS on change
      js: {
        files: '<%= jshint.files %>',
        tasks: ['jshint', 'concat', 'uglify']
      },

      react: {
        files: 'public/javascripts/**/*.jsx',
        tasks: ['react']
      },

      // Live reload files
      livereload: {
        options: { livereload: true },
        files: [
          '<%= dir.css %>/**/*.css',  // all .css files in css/ dir
          '<%= dir.js %>/**/*.js',    // all .js files in js/ dir
          '**/*.{html,php}',          // all .html + .php files
          '<%= dir.img %>/**/*.{png,jpg,jpeg,gif,svg}'  // img files in img/ dir
        ]
      }
    }
  });

  grunt.registerTask('default', [
    'jshint',           // JShint
    'concat:js',        // Concatenate main JS files
    'uglify',           // Minifiy concatenated JS file
    'sass:dev',         // Compile Sass with dev settings
    'react',
  ]);

  grunt.registerTask('production', [
    'jshint',           // JShint
    'concat:js',        // Concatenate main JS files
    'uglify',           // Minifiy concatenated JS file
    'sass:dist',        // Compile Sass with distribution settings
    'svg2png',          // Convert svg files to png
    'svgmin',           // Compress svg files
    'imagemin',         // Compress jpg/jpeg + png files
  ]);

  grunt.registerTask('images', [
    'svg2png',          // Convert svg files to png
    'svgmin',           // Compress svg files
    'imagemin',         // Compress jpg/jpeg + png files
  ]);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-svg2png');
  grunt.loadNpmTasks('grunt-react');

};