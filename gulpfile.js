/*global require*/

var gulp = require("gulp"),
    uglify = require("gulp-uglify");

gulp.task("default", function() {
    "use strict";
    gulp
        .src("src/probe.js")
        .pipe(uglify())
        .pipe(gulp.dest("./dist"));
});
