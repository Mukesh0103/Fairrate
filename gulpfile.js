const { src, dest, series, watch, parallel } = require('gulp');
const del = require('del');
const connect = require('gulp-connect');
const sass = require('gulp-sass')
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const sourceMaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

const jsPaths = [
    'src/js/**.js'
];

const sassPaths = [
    'src/scss/style.scss',
]

const imagePaths = [
    'src/images/**'
];

const fontPaths = [
    'src/font/**'
]

function clean() {
    return del('dist/**');
}

function finalHtml() {
    return src('src/index.html')
        .pipe(dest('./'))
        .pipe(connect.reload());
}

function sassToCss() {
    return src(sassPaths)
        .pipe(sass())
        .pipe(dest('dist/css'))
        .pipe(sourceMaps.init())
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourceMaps.write())
        .pipe(dest('dist/css'))
        .pipe(connect.reload());
}

function jsMinification() {
    return src(jsPaths)
        .pipe(sourceMaps.init())
        .pipe(concat('final.js'))
        .pipe(terser())
        .pipe(sourceMaps.write())
        .pipe(dest('dist/js'))
        .pipe(connect.reload());
}

function finalImages() {
    return src(imagePaths)
        .pipe(dest('dist/images'))
        .pipe(connect.reload());
}

function finalFont(){
    return src(fontPaths)
    .pipe(dest('dist/font'))
    .pipe(connect.reload());
}

function watchFiles() {
    watch('src/index.html', { delay: 500 }, finalHtml);
    watch('src/scss/**', { delay: 500 } , sassToCss);
    watch(jsPaths, { delay: 500 }, jsMinification);
    watch(imagePaths, { delay: 500 }, finalImages);
    watch(fontPaths, { delay: 500 }, finalFont);    
}

function server() {
    connect.server({
        root: './',
        livereload: true
    });
}

exports.default = series(clean, parallel(finalHtml, jsMinification, finalImages, sassToCss, finalFont), parallel(server, watchFiles));