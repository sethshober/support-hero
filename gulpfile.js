var gulp    = require('gulp')
  , jshint  = require('gulp-jshint')
  , concat  = require('gulp-concat')
  , nodemon = require('gulp-nodemon')
  , babel   = require("gulp-babel")

//var packageJSON  = require('./package');
//var jshintConfig = packageJSON.jshintConfig;

//jshintConfig.lookup = false;

var config = {
  jsPath: 'public/js/ng/**/*.js',
}

gulp.task('js', ['lint'], function(){
  gulp.src(['public/js/ng/module.js', config.jsPath])
    .pipe(babel())
    .pipe(concat('js/app.js'))
    .pipe(gulp.dest('public'))
})

gulp.task('lint', function() {
  return gulp.src(config.jsPath)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
})

gulp.task('watch:js', ['js'], function(){
  gulp.watch(config.jsPath, ['js'])
})

gulp.task('dev:server', function(){
  nodemon({
    script: 'bin/www',
    ect:    'js',
    ignore: ['ng*', 'gulp*', 'assets*']
  })
})

gulp.task('default',['watch:js', 'dev:server'], function(){})




