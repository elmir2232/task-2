
var gulp = require('gulp');

var sass       	 = require('gulp-sass');
var browserSync 	 = require('browser-sync').create();

function style(){
  return gulp.src('src/css/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
}
function watch(){

  browserSync.init({
    server:{
      baseDir: './'
    }
  });
  gulp.watch('./src/css/**/*.scss',style);
  gulp.watch('./*html').on('change', browserSync.reload);
  gulp.watch('./js/**/*.js').on('change',browserSync.reload);

}

var fontName = 'Icons';
 
gulp.task('iconfont', async () =>{
  gulp.src(['src/assets/icons/*.svg'])
    .pipe(iconfontCss({
      fontName: fontName,
    
      targetPath: '../../styles/common/_icons.scss',
      fontPath: 'src/assets/fonts/'
    }))
    .pipe(iconfont({
      fontName: fontName,
      
      normalize   : true,
      fontHeight  : 1001
     }))
     
    .pipe(gulp.dest('src/assets/fonts/'));
});
exports.style = style;
exports.watch = watch;