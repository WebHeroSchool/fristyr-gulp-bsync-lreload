const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const paths = {
    src: {
        styles:'src/style/*.css',
        scripts: 'src/scripts/*.js'
    },
    build: {
        styles: 'build/styles',
        scripts: 'build/scripts'
    },
    buildNames: {
        styles: 'index.min.css',
        scripts: 'index.min.js'
    }
};

gulp.task('buildJs', () => {
    return gulp.src([paths.src.scripts])
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.scripts))
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.scripts))
});

gulp.task('buildCss', () => {
    return gulp.src([paths.src.styles])
        .pipe(sourcemaps.init())
            .pipe(concat(paths.buildNames.styles))
            .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.build.styles))
});

gulp.task('default', ['buildJs', 'buildCss']);


gulp.task('browser-sync',() => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.task('watch', () => {
        gulp.watch(paths.src.scripts, ['js-watch']);
        gulp.watch(paths.src.styles, ['css-watch']);
    });
});

gulp.task('js-watch', ['js'], () => browserSync.reload());
gulp.task('css-watch', ['css'], () => browserSync.reload());