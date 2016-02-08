var gulp = require('gulp');
var browserSync = require('browser-sync');
var plumber = require('gulp-plumber');
var swig = require('gulp-swig');
var stylus = require('gulp-stylus');

var reload = browserSync.reload;

function errorLog(error) {
  console.error.bind(error);
  this.emit('end');
};

gulp.task('swig', function () {
  gulp.src('./swig/**/*.html')
    .pipe(plumber())
    .pipe(swig({ defaults: { cache: false }}))
    .pipe(gulp.dest('./build'))
    .pipe(reload({stream: true}));
});

gulp.task('stylus', function () {
  gulp.src('stylus/**/*.stylus')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('build/css'))
    .pipe(reload({stream: true}));
});

gulp.task('watch', function () {
  browserSync({ server: { baseDir : "./build" } })
  gulp.watch('./swig/**/*.html', ['swig']);
  gulp.watch('stylus/**/*.stylus', ['stylus']);
});

gulp.task('default', ['swig', 'stylus', 'watch']);
