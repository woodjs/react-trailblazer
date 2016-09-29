var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var basePath = './src/static';
var pathMap = {
  cssSrcPath: basePath + '/scss/app.scss',
  cssDistPath: basePath + '/release/styles',
  jsSrcPath: [basePath + '/js/zepto-1.2.0.js', basePath + '/js/ejs-1.0.0.js', basePath + '/js/buy.js', basePath + '/js/invoice.js'],
  jsDistPath: basePath + '/release/scripts',
  imgSrcPath: basePath + '/scss/images/*',
  imgDistPath: basePath + '/release/styles/images'
};

var concatJsName = 'app.js';  // 配置合并js操作生成的目标文件名，.js不可省略

// 样式
gulp.task('css', function () {
  return sass(pathMap.cssSrcPath, {style: 'expanded'})
    .pipe(gulp.dest(pathMap.cssDistPath))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(pathMap.cssDistPath))
    .on('end', function () {
      console.log('task css finished!');
    });
});

// 图片
gulp.task('imgcopy', function () {
  return gulp.src(pathMap.imgSrcPath)
    .pipe(gulp.dest(pathMap.imgDistPath))
    .on('end', function () {
      console.log('task imgcopy finished!');
    });
});

// 脚本
gulp.task('js', function () {
  return gulp.src(pathMap.jsSrcPath)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat(concatJsName))  // 如果不需要合并js，则删除之
    .pipe(gulp.dest(pathMap.jsDistPath))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(pathMap.jsDistPath))
    .on('end', function () {
      console.log('task js finished!');
    });
});

// 默认任务
gulp.task('default', function () {
  gulp.start('css', 'imgcopy', 'js');
});
