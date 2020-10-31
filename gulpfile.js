// Import plugins
const gulp = require('gulp');
const { src, series, parallel, dest, watch } = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

// Creates paths 
const htmlPath = 'src/*.html';
const imgPath = 'src/images/*';
const jsPath = 'src/js/*.js';
const sassPath = 'src/sass/*.scss';


// Copy all html-files to pub folder
function htmlTask() {
    return src(htmlPath)
     .pipe(gulp.dest('pub'));
}

// Optimise all images used
function imgTask() {
    return src(imgPath)
     .pipe(imagemin())
     .pipe(gulp.dest('pub/img'));
}

// Concatinate and minify all js-files
function babelTask () {
    return src(jsPath)
     .pipe(sourcemaps.init())
     .pipe(babel({ presets: ['@babel/env'] }))
     .pipe(concat('main.js'))
     .pipe(terser())
     .pipe(sourcemaps.write('.'))
     .pipe(gulp.dest('pub/js'))
}

// Concatinate and minify all sass-files
function sassTask() {
    return src(sassPath)
     .pipe(sourcemaps.init())
     .pipe(sass())
     .pipe(postcss([autoprefixer(), cssnano()]))
     .pipe(sourcemaps.write('.'))
     .pipe(gulp.dest('pub/css'));
}

// Uptade when changes
function watchTask() {
    browsersync.init({
        injectChanges: false,
        server: {
            baseDir: './pub/'
        }
    })

    gulp.watch(htmlPath, htmlTask).on('change', browsersync.reload);
    gulp.watch(imgPath, imgTask).on('change', browsersync.reload);
    gulp.watch(jsPath, babelTask).on('change', browsersync.reload);
    gulp.watch(sassPath, sassTask).on('change', browsersync.reload);
   
}

// Build public folder 
function buildTask(cb) {
    htmlTask();
    imgTask();
    babelTask();
    sassTask();  
    console.log('pub folder is built...');
    cb();
}

// Export tasks
exports.htmlTask = htmlTask;
exports.imgTask = imgTask;
exports.babelTask = babelTask;
exports.sassTask = sassTask;
exports.watchTask = watchTask;
// Build public folder
exports.buildTask = buildTask;

// Run all tasks and then start watchTask
exports.default = series(parallel(htmlTask, imgTask, babelTask, sassTask), watchTask);
