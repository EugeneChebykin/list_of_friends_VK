const gulp = require("gulp");
const less = require("gulp-less");
const concat = require("gulp-concat");
const autoPrefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const del = require("del");
const browserSync = require("browser-sync").create();

const cssFiles = [
    "node_modules/normalize.css/normalize.css",
    "node_modules/fortawesome/fontawesome-free/css/all.css",
    "src/less/styles.less"
];

const jsFiles = [
    "src/js/script.js"
];

function styles() {
    return gulp.src(cssFiles)
            .pipe(concat("styles.css"))
            .pipe(less())
            .pipe(autoPrefixer({
                browsers: ["> 0.1%"],
                cascade: false
            }))
            .pipe(cleanCSS({
                level: {
                    2: {
                        all: true
                    }
                }
            }))
            .pipe(gulp.dest("build/css"))
            .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src(jsFiles)
            .pipe(concat("script.js"))
            //Uglify don't work with ES6
            //
            // .pipe(uglify({
            //     toplevel: true
            // }))
            .pipe(gulp.dest("build/js"))
            .pipe(browserSync.stream());
}

function clean() {
    return del(["build/*"]);
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        tunnel: true
    });

    gulp.watch("src/less/**/*.less", styles);
    gulp.watch("src/js/**/*.js", scripts);
    gulp.watch("*.html").on("change", browserSync.reload);
}

gulp.task("styles", styles);
gulp.task("watch", watch);
gulp.task("build", gulp.series(clean,
                        gulp.parallel(styles, scripts)
                   )
);