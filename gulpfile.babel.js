const gulp = require('gulp');
const pug = require('gulp-pug');
// const sass = require('gulp-sass');
var sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const plumber = require('gulp-plumber');

//Constante para el modulo de recarga automática del sitio web al hacer cambios
const browserSync = require('browser-sync');
//Instancia del servidor de desarrollo
const server = browserSync.create();

gulp.task('pug', () => {
    return gulp.src('./dev/views/pages/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./public'))
});

//tarea para los estilos de la UX
gulp.task("styles", () => {
    return gulp
        .src('./dev/scss/styles.scss')
        .pipe(plumber())
        .pipe(
            sass({
                outputStyle: "compressed"
            })
        )
        .pipe(
            autoprefixer()
        )
        .pipe(gulp.dest('./public/css'))
        .pipe(server.stream())
});

//tarea para el js de la UX
gulp.task("babel", () => {
    return gulp
        .src("./dev/js/*.js")
        .pipe(plumber())
        .pipe(
            babel({ presets: [ "@babel/preset-env" ] })
        )
        .pipe(concat("scripts-min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("./public/js/"))
});

gulp.task('default', () => {
    //Iniciación del servidor en el puerto 80
    server.init({
      server: './public'
    })
    //Watchers (vigilantes) para vigilar los cambios y mostrarlos en tiempo real
    //PUG
    gulp.watch('./dev/views/**/*.pug', gulp.series('pug')).on('change', server.reload)
    //SCSS
    gulp.watch('./dev/scss/styles.scss', gulp.series('styles'))
    //JS
    gulp.watch('./dev/js/*.js', gulp.series('babel')).on('change', server.reload)
});