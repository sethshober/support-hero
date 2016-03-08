// this is mostly for future use

var gulp           = require('gulp')
  , concat         = require('gulp-concat')
  , nodemon        = require('gulp-nodemon')
  , mainBowerFiles = require('main-bower-files')

var config = {
  jsPath: 'public/js/*.js'
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


gulp.task('dev:server', function(){
    nodemon({
        script: 'bin/www',
        ect:    'js',
        ignore: ['ng*', 'gulp*', 'assets*']
    })
})

gulp.task('default',['dev:server'],  function(){})