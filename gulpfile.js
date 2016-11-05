var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('develop', function() {
    nodemon({
        script: 'server.js',
        env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('default', ['develop']);