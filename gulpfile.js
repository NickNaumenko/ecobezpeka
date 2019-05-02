/* eslint-disable quotes */
const del = require("del");
const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const mqpacker = require("css-mqpacker");
const minify = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const cheerio = require("gulp-cheerio");
const concat = require("gulp-concat");
// const pug = require("gulp-pug");
const pug = require("gulp-pug-i18n");

const paths = {
  dirs: {
    build: "./build"
  },
  html: {
    src: "./src/pages/*.pug",
    dest: "./build",
    watch: [
      "./src/pages/*.pug",
      "./src/templates/*.pug",
      "./src/blocks/**/*.pug"
    ]
  },
  css: {
    src: "./src/styles/style.scss",
    dest: "./build/css",
    watch: [
      "./src/blocks/**/*.scss",
      "./src/styles/**/*.scss"
    ]
  },
  js: {
    src: ['./src/blocks/**/*.js'],
    dest: './build/js',
    watch: './src/blocks/**/*.js'
  },
  images: {
    src: "./src/blocks/**/img/*",
    dest: "./build/img",
    watch: ["./src/blocks/**/img/*"]
  },
  sprite: {
    // src: "./src/sprite/*.svg",
    // dest: "./build/img"
    src: "./src/blocks/**/{logo*.svg,icon*.svg}",
    dest: "./build/img"
  },
  locales: {
    src: "./src/locales/*.json"
  }
};

gulp.task("clean", () => {
  return del(paths.dirs.build);
});

gulp.task("templates", () => {
  return gulp.src(paths.html.src)
    .pipe(plumber())
    .pipe(pug({
      i18n: {
        locales: "./src/locales/*{.json, .yml}",
        namespace: "l",
        filename: "{{lang}}/{{basename}}.html"
      },
      pretty: true
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(server.stream());
});

gulp.task("styles", () => {
  return gulp.src(paths.css.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: [
          "last 1 version",
          "last 2 Chrome versions",
          "last 2 Firefox versions",
          "last 2 Opera versions",
          "last 2 Edge versions"
        ]
      }),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(server.stream())
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest(paths.css.dest));
});

gulp.task('scripts', function () {
  return gulp.src(paths.js.src)
    .pipe(plumber())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.js.dest));
});

gulp.task("images", () => {
  return gulp.src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(rename({
      dirname: ""
    }))
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task(`sprite`, () => {
  return gulp.src(paths.sprite.src)
    .pipe(cheerio({
      // eslint-disable-next-line object-shorthand
      run: function ($) {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: {
        xmlMode: true
      }
    }))
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename(`sprite.svg`))
    .pipe(gulp.dest(paths.sprite.dest));
});

gulp.task("server", () => {
  server.init({
    server: {
      baseDir: paths.dirs.build
    },
    reloadOnRestart: true,
    tunnel: "remote"
  });
  gulp.watch(paths.html.watch, gulp.parallel('templates'));
  gulp.watch(paths.css.watch, gulp.parallel('styles'));
  gulp.watch(paths.js.watch, gulp.parallel('scripts'));
  gulp.watch(paths.images.watch, gulp.parallel('images'));
});

gulp.task("build", gulp.series(
    "clean",
    "sprite",
    "templates",
    "styles",
    "scripts",
    "images"
));

gulp.task("dev", gulp.series(
    "build", "server"
));
