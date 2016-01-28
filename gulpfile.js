// Via https://travismaynard.com/writing/getting-started-with-gulp

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var gutil = require('gulp-util');
var hbsfy = require('hbsfy');

gulp.task('sass', function () {
  gulp.src('static/_scss/styles.scss')
    .pipe(sass({
      includePaths: require('node-neat').includePaths
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
  var b = browserify({
    entries: 'static/js/init.js',
    debug: true
  });

  hbsfy.configure({
      extensions: ['hbs', 'handlebars']
  });

  return b
    .transform(hbsfy)
    .bundle()
    .pipe(source('all.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('static/_scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['sass', 'watch']);
