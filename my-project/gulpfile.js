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
var jasmineBrowser = require('gulp-jasmine-browser');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var print = require('gulp-print').default; #Unnecessary for the styles task...

//Former default function - for testing purposes!
/*gulp.task("default", function defaultTask(cb) {
  console.log("Testing, 1, 2, 3!");
  cb();
});*/

browserSync.init({
  server: "./dist"
});

gulp.task('run_maintenance', async function(){
  gulp.series('copy-html', 'copy-img', 'styles', 'lint');
})

gulp.task("default", function() {
  gulp.watch('./sass/**/*.scss', gulp.series('styles'));
  gulp.watch('js/**/*.js', gulp.series('lint'));
  gulp.watch('./index.html', gulp.series('copy-html'));
  gulp.watch('./img', gulp.series('copy-img'));
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
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe( gulp.dest('./dist/css') )
      .pipe(browserSync.stream());
  console.log("SASS has updated the CSS!")
});


gulp.task('scripts', function() {
  gulp.src('./js/**/*.js')
      .pipe(concat('all.js'))
      .pipe(gulp.dest('dist/js'));
})


//Concatenates and minifies JavaScript code into one file, all.js
gulp.task('scripts-dist', function() {
  gulp.src('./js/**/*.js')
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
  console.log("The JS has been concatenated into 'all.js' and minified!")
})


// Copies the existing html file into the project's "working" directory
gulp.task('copy-html', async function() {
  gulp.src('./index.html')
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.reload({
        stream: true
      }));
  console.log("Gulp has updated the index.html file!")
})


gulp.task('copy-img', async function() {
  gulp.src('./img/*')
      .pipe(gulp.dest('./dist/img'));
      console.log("Gulp has updated the images folder!")
})


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

// THE FOLLOWING FUNCTION DOES NOT WORK, USE THE FUNCTION BELOW IT!
/*
gulp.task('tests', function() {
      return gulp
          .src('tests/spec/extraSpec.js')
          .pipe(jasmineBrowser.specRunner({ console: true }))
          .pipe(jasmineBrowser.headless({ driver: 'chrome' }));
  });
  */

//
gulp.task('tests', function() {
    gulp
        .src('tests/spec/extraSpec.js')
        .pipe(jasmineBrowser.specRunner())
        .pipe(jasmineBrowser.server({ port: 3001 }));
});
