const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const minifyCSS = require('gulp-minify-css');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
sourcemaps = require('gulp-sourcemaps'),

gulp.task('styles', () => {
   return gulp.src('./dev/styles/style.scss')
      .pipe(plumber({
         errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(minifyCSS())
      .pipe(concat('style.css'))
      .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./public/styles'))
      .pipe(reload({ stream: true }));
});

gulp.task('scripts', () => {
   return gulp.src('./dev/scripts/main.js')
      .pipe(plumber({
         errorHandler: notify.onError("Error: <%= error.message %>")
      }))
      .pipe(babel({
         presets: ['env']
      }))
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./public/scripts'))
      .pipe(reload({ stream: true }));
});

gulp.task('bs', () => {
   browserSync.init({
      server: '.'
   });
});

gulp.task('default', ['styles', 'scripts', 'bs'], () => {
   gulp.watch('./dev/styles/**/*.scss', ['styles']);
   gulp.watch('./dev/scripts/**/*.js', ['scripts']);
   gulp.watch('./**/*.html', reload);
});