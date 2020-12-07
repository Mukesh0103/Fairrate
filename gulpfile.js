const { src, dest, series, watch, parallel } = require('gulp');
const del = require('del');
const connect = require('gulp-connect');
const sass = require('gulp-sass')
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const sourceMaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');

const webpageJsPaths = [
    'src/js/**.js',
];

const webpageSassPaths = [
    'src/scss/style.scss',
]

const webpageImagePaths = [
    'src/images/**'
];

const webpageFontPaths = [
    'src/font/**'
]

const webappJsPaths = [
    'webapp/src/js/**.js'
];

const webappSassPaths = [
    'webapp/src/scss/style.scss',
]

const webappImagePaths = [
    'webapp/src/images/**'
];

const webappFontPaths = [
    'webapp/src/font/**'
]

function clean() {
    return del('dist/**', 'webapp/dist/**');
}

function webpageFinalHtml() {
    return src('src/index.html')
        .pipe(dest('./'))
        .pipe(connect.reload());
}

function webappFinalHtml() {
    return src('webapp/src/index.html')
        .pipe(dest('webapp/'))
        .pipe(connect.reload());
}

function webpageSassToCss() {
    return src(webpageSassPaths)
        .pipe(sass())
        .pipe(dest('dist/css'))
        .pipe(sourceMaps.init())
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourceMaps.write())
        .pipe(dest('dist/css'))
        .pipe(connect.reload());
}

function webappSassToCss() {
    return src(webappSassPaths)
        .pipe(sass())
        .pipe(dest('webapp/dist/css'))
        .pipe(sourceMaps.init())
        .pipe(minifyCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourceMaps.write())
        .pipe(dest('webapp/dist/css'))
        .pipe(connect.reload());
}

function webpageJsMinification() {
    return src(webpageJsPaths)
        .pipe(sourceMaps.init())
        .pipe(concat('final.js'))
        .pipe(terser())
        .pipe(sourceMaps.write())
        .pipe(dest('dist/js'))
        .pipe(connect.reload());
}

function webappJsMinification() {
    return src(webappJsPaths)
        .pipe(sourceMaps.init())
        .pipe(concat('final.js'))
        .pipe(terser())
        .pipe(sourceMaps.write())
        .pipe(dest('webapp/dist/js'))
        .pipe(connect.reload());
}

function webpageFinalImages() {
    return src(webpageImagePaths)
        .pipe(dest('dist/images'))
        .pipe(connect.reload());
}

function webappFinalImages() {
    return src(webappImagePaths)
        .pipe(dest('webapp/dist/images'))
        .pipe(connect.reload());
}

function webpageFinalFont() {
    return src(webpageFontPaths)
        .pipe(dest('dist/font'))
        .pipe(connect.reload());
}

function webappFinalFont() {
    return src(webappFontPaths)
        .pipe(dest('webapp/dist/font'))
        .pipe(connect.reload());
}

function watchFiles() {
    watch('src/index.html', { delay: 500 }, webpageFinalHtml);
    watch('webapp/src/index.html', { delay: 500 }, webappFinalHtml);
    watch('src/scss/**', { delay: 500 }, webpageSassToCss);
    watch('webapp/src/scss/**', { delay: 500 }, webappSassToCss);
    watch(webpageJsPaths, { delay: 500 }, webpageJsMinification);
    watch(webappJsPaths, { delay: 500 }, webappJsMinification);
    watch(webpageImagePaths, { delay: 500 }, webpageFinalImages);
    watch(webappImagePaths, { delay: 500 }, webappFinalImages);
    watch(webpageFontPaths, { delay: 500 }, webpageFinalFont);
    watch(webappFontPaths, { delay: 500 }, webappFinalFont);
}

function server() {
    connect.server({
        root: './',
        livereload: true
    });
}

exports.default = series(clean, parallel(webpageFinalHtml, webpageJsMinification, webpageFinalImages, webpageSassToCss,
    webpageFinalFont, webappFinalHtml, webappSassToCss, webappJsMinification, webappFinalImages, webappFinalFont), parallel(server, watchFiles));