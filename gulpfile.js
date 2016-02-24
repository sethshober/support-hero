var gulp           = require('gulp')
  , concat         = require('gulp-concat')
  , nodemon        = require('gulp-nodemon')
  , bower          = require('gulp-bower')
  , mainBowerFiles = require('main-bower-files')

var config = {
  jsPath: 'public/js/*.js',
  bowerPath: 'bower_components'
}


// FIX ME
// gulp.task('js', function(){
//     gulp.src(['public/js/ng/controllers/module.js', config.jsPath])
//         .pipe(concat('app.js'))
//         .pipe(ngAnnotate())
//        // .pipe(uglify())
//         .pipe(gulp.dest('public'));
// });

// gulp.task('watch:js', ['js'], function(){
//     gulp.watch(config.jsPath, ['js'])
// })

// TODO: Add live reload.

gulp.task('bower', function() {
  gulp.src(mainBowerFiles(), { base: config.bowerPath })
    .pipe(gulp.dest('public/js/lib'))
})

gulp.task('dev:server', function(){
    nodemon({
        script: 'bin/www',
        ect:    'js',
        ignore: ['ng*', 'gulp*', 'assets*']
    })
})

gulp.task('default',['bower', 'dev:server'],  function(){})