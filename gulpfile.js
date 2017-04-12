const gulp = require('gulp'),
      plumber = require('gulp-plumber');
      concat = require('gulp-concat'),
      autoprefixer = require('gulp-autoprefixer'),
      stylus = require('gulp-stylus'),
      pug = require('gulp-pug'),
      webserver = require('gulp-webserver');

gulp.task('views', () => {

  return gulp.src('src/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('./public/'));

});

gulp.task('styles', () => {

  return gulp.src('src/*.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(concat('app.css'))
    .pipe(gulp.dest('./public/'));

});

gulp.task('images', () => {

  return gulp.src('src/images/**/*')
    .pipe(gulp.dest('./public/images/'));

});


gulp.task('webserver', function() {
  gulp.src( './public/' )
    .pipe(webserver({
      livereload: true
    }));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.pug', ['views']);
  gulp.watch('src/**/*.styl', ['styles']);
  gulp.watch('src/images/**/*', ['images']);
});

gulp.task('build', ['images', 'styles', 'views']);
gulp.task('default', ['build', 'webserver', 'watch']);
