//function defaultTask(cb) {
  // place code for your default task here
//  cb();
//}

//exports.default = defaultTask

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
//var print = require('gulp-print').default; #Unnecessary for the styles task...

//Former default function - for testing purposes!
/*gulp.task("default", function defaultTask(cb) {
  console.log("Testing, 1, 2, 3!");
  cb();
});*/

browserSync.init({
  server: "./"
});

gulp.task("default", function() {
  gulp.watch('./sass/**/*.scss', gulp.series('styles'));
});

gulp.task("styles", async function() {
  gulp.src('./sass/**/*.scss')
      .pipe(sass())
      .on("error", sass.logError)
      .pipe(
        autoprefixer({
          browsers:["last 2 versions"]
        })
      )
      .pipe( gulp.dest('./css') )
      .pipe(browserSync.stream());
  console.log("SASS has updated the CSS!")
});
