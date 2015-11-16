'use strict';
 
var gulp      	   = require('gulp'),
	sass           = require('gulp-sass'),
	concat         = require('gulp-concat'),
	plumber        = require('gulp-plumber'),
	uglify         = require('gulp-uglify'),
	rename         = require('gulp-rename'),
	minifyCss      = require('gulp-minify-css'),
	mainBowerFiles = require('main-bower-files');

var sass_path = 'public/sass/',
	css_path  = 'public/css/',
	js_path   = 'public/js/',
	dist_path = 'public/dist/';


// // Bower Files
// var bowerTask = function(){
// 	// move CSS files
// 	gulp.src(mainBowerFiles('**/*.css'))
// 			.pipe(gulp.dest(css_path));
// 	// move JS files
// 	gulp.src(mainBowerFiles('**/*.js'))
// 			.pipe(gulp.dest(js_path + 'libs/'));
// }

// gulp.task('bower', function() {
// 	bowerTask();
// });

// Sass Task 
gulp.task('sass', function () {
	gulp.src(sass_path + '**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(css_path));
});

// CSS Task
gulp.task('css', function () {
	gulp.src(css_path + '**/*.css')
		.pipe(concat('all.css'))
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(rename('all.min.css'))
		.pipe(gulp.dest(dist_path));
});

// Default Task
gulp.task('default', function(){
	gulp.watch(sass_path + '**/*.scss', ['sass']);
	gulp.watch(css_path + '**/*.css', ['css']);
});
