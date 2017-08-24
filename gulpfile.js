const gulp = require('gulp')
// const rev = require('gulp-rev')  //添加版本号
// const revReplace = require('gulp-rev-replace')  //版本号替换
const cssnano = require('gulp-cssnano')  //压缩css
const uglify = require('gulp-uglify')   //压缩js
// const minhtml = require('gulp-htmlmin')  //html压缩
const concat = require('gulp-concat')  //文件合并
// const rename = require('gulp-rename')  //重命名
// const clean = require('gulp-clean')  //清空文件夹
const jshint = require('gulp-jshint')  //js代码规范检测
const imagemin = require('gulp-imagemin');

gulp.task('js', function (){
  gulp.src('./src/js/*.js')  //查找路径
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(concat('all.js'))  //合并符合条件的文件
  .pipe(uglify())   //业务处理
  .pipe(gulp.dest('dist/js/')) //处理后生成文件
})

gulp.task('css', function(){
  gulp.src('./src/css/*.css')
  .pipe(concat('all.css'))
  .pipe(cssnano())
  .pipe(gulp.dest('dist/css/'))
})

gulp.task('img', () =>
    gulp.src('src/images/*')
        .pipe(imagemin([
          imagemin.gifsicle({interlaced: true}),
          imagemin.jpegtran({progressive: true}),
          imagemin.optipng({optimizationLevel: 5}),
          imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest('dist/images'))
)
gulp.task('build',['js', 'css', 'img'])