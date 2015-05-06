var gulp          = require('gulp'),
    connect       = require('gulp-connect'),
    less          = require('gulp-less'),
    sass          = require('gulp-sass'),
    concat        = require('gulp-concat'),
    prefix        = require('gulp-autoprefixer'),
    minifyCSS     = require('gulp-minify-css'),
    autowatch     = require('gulp-autowatch'),
    plumber       = require('gulp-plumber'),
    uglify        = require('gulp-uglify');


// HTML

gulp.task('htmls', function () {
  gulp.src(['*.html', 'basicShop/*.html'])
    .pipe(connect.reload());
});


// less

gulp.task('styles', function() {
  return gulp.src('src/less/*.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(prefix([{  browsers: ['IE 8', 'IE 9', 'last 5 versions', 'Firefox 14', 'Opera 11.1']  }]))
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest('dst/css'))
    // .pipe(connect.reload());
});

gulp.task('materialize', function() {
  return gulp.src('materialize/sass/materialize.scss')
    .pipe(sass())
    .pipe(plumber())
    .pipe(prefix([{  browsers: ['IE 8', 'IE 9', 'last 5 versions', 'Firefox 14', 'Opera 11.1']  }]))
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest('materialize/css'))
    // .pipe(connect.reload());
});

// JS
gulp.task('scripts', function(){
  return gulp.src('src/js/*.js')
    .pipe(plumber())
    // .pipe(concat('ie.min.js'))
    .pipe(gulp.dest('dst/js'))
    .pipe(connect.reload());
});

// gulp.task('plugins', function(){
//   return gulp.src(['bo/js/*.js', 'mobile/js/*.js', 'basic/js/*.js'])
//     .pipe(plumber())
//     .pipe(concat('scripts.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest(['bo/js', 'mobile/js', 'basic/js']))
//     // .pipe(connect.reload());
// })

// WATCH

var paths = {
  htmls:          ['*.html', 'basicShop/*.html'],
  // basicshopStyles: 'ccs/less/basicShop/*.less',
  styles:         'src/less/*.less',
  materialize:    'materialize/sass/**/*.scss',
  // plugins:        '**/js/*.js'
  scripts:      'src/js/*.js'
};

gulp.task('watch', function(cb) {
  autowatch(gulp, paths);
  return cb();
});

// LIVERELOAD 

gulp.task('connect', function() {
  connect.server({
    port: '3005',
    livereload: true
  });
});

// DEFAULT

gulp.task('default',  [
  'styles',
  'watch',
  'scripts',
  'materialize',
  'htmls',
  'connect'
  ]);