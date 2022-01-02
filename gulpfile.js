const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const through2 = require( 'through2' );

// from https://stackoverflow.com/a/52303073
const touch = () => through2.obj( function( file, enc, cb ) {
    if ( file.stat ) {
        file.stat.atime = file.stat.mtime = file.stat.ctime = new Date();
    }
    cb( null, file );
});

function style() {
  return gulp.src('./sass/**/*.*')
    .pipe(sass())
    .pipe(gulp.dest('./public'));

}

function touchZola() {
  return gulp.src('./templates/base.html')
    .pipe(touch())
    .pipe(gulp.dest('./templates'));
}

function watch() {
  gulp.watch('./sass/**/*.scss', gulp.series(style, touchZola));
}

exports.style = style;
exports.watch = watch;
