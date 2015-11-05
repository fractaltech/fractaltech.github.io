'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const watch = require('gulp-watch');
const babel = require('gulp-babel');

function build(done) {
  done = done instanceof Function ? done : () => {};

  const g = gulp.src([
    'src/app.js',
    'src/**/*.js',
    'src/main.js'
  ])
  .pipe(sourcemaps.init())
    .pipe(babel({presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-2']}))
    .on('error', (e) => { g.emit('end'); console.log(e); })
    .pipe(concat('app.built.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('www'))
  .on('end', () => { console.log('build complete'); done() });
}

gulp.task('app', (done) => {
  build(done);
});

gulp.task('watch', (done) => {
  watch(['src/**/*.*'], build);
});