//function defaultTask(cb) {
  // place code for your default task here
//  cb();
//}

//exports.default = defaultTask

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
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
  gulp.watch('js/**/*.js', gulp.series('lint'));
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


gulp.task('lint', async function() {
    return (
      gulp.src(['js/**/*.js'])
          // eslint() attaches the lint output to the "eslint" property
          // of the file object so it can be used by other modules.
          .pipe(eslint())
          // eslint.format() outputs the lint results to the console.
          // Alternatively use eslint.formatEach() (see Docs).
          .pipe(eslint.format())
          // To have the process exit with an error code (1) on
          // lint error, return the stream and pipe to failAfterError last.
          .pipe(eslint.failAfterError())
        )}
      );
