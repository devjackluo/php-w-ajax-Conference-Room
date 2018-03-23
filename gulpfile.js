// Module imports:
var gulp       = require('gulp'           );
var typescript = require('gulp-typescript');
var webpack    = require('gulp-webpack'   );
var rename     = require("gulp-rename"    );
var uglify     = require('gulp-uglify'    );

// ---------------------------------- //
// Typescript globals for compilation //
// ---------------------------------- //

// Folder references for Typescript exporting and bundling:
var tsProject = "ts/";      // Root Typescript folder
var tsOutput  = "ts/_JS_/"; // Exported intermediary javascript
var jsOutput  = "js";       // Packaged and compressed javascript bundles

// Typescript compiler options: Targets old browsers with es5 compatability
var tsOptions = {
  target            : "es5",
  module            : "commonjs",
  removeComments    : true,
  preserveConstEnums: true
}

// ---------------- //
// Typescript tasks //
// ---------------- //

/**
 * Export all typescript files into intermediary javascript files with comments removed
 * Typescript classes are converted into modules for loading via a small js library called webpack
 */
gulp.task("exportTypscript", function exportTypscript() {

  // Compile typescpt to intermediary code
  gulp.src(tsProject+'**/*.ts')
  .pipe(typescript(tsOptions))
  .pipe(gulp.dest(tsOutput));

  // Bundle and compress javascript components for items pertaining to Index.js
  gulp.src(tsOutput+'Index.js')
  .pipe(webpack())
  .pipe(uglify())
  .pipe(rename({basename: "Index"}))
  .pipe(gulp.dest(jsOutput));

  // Bundle and compress javascript components for items pertaining to ConferenceRoom.js
  gulp.src(tsOutput+'ConferenceRoom.js')
  .pipe(webpack())
  .pipe(uglify())
  .pipe(rename({basename: "ConferenceRoom"}))
  .pipe(gulp.dest(jsOutput));
});