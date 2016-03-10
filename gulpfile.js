var gulp           = require('gulp')
  , concat         = require('gulp-concat')
  , nodemon        = require('gulp-nodemon')

var config = {
  jsPath: 'public/js/ng/**/*.js',
}

gulp.task('js', function(){
  gulp.src(['public/js/ng/module.js', config.jsPath])
    .pipe(concat('js/app.js'))
    .pipe(gulp.dest('public'))
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




