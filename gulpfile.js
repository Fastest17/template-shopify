const gulp            = require('gulp'),
      sass            = require('gulp-sass'),
      cleanCSS 		    = require('gulp-clean-css'),
      sourcemaps 	  	= require('gulp-sourcemaps'),
		  autoprefixer 	  = require('gulp-autoprefixer'),
	  	babel 		    	= require('gulp-babel'),
      uglify 		    	= require('gulp-uglify'),
      rename          = require('gulp-rename');


const sourceSCSS     	= 'assets/**/*.scss',
      sourceCSS     	= 'assets/perfit.scss',
      sourceJS      	= 'assets/perfit.js',
      distPath        = 'assets/';


// scss
gulp.task('sass', (done) => {
     gulp.src(sourceCSS)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expand'}).on('error', sass.logError))
        .pipe(autoprefixer({
          cascade: true
        }))     
        .pipe(gulp.dest(distPath))
        .pipe(cleanCSS()) //minify
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('/')) 
        .pipe(gulp.dest(distPath))

        done();
});

// js
gulp.task('babel', () =>
  gulp.src(sourceJS)
	.pipe(babel({
		presets: ['@babel/env']
	}))
  .pipe(uglify()) //minify
  .pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(distPath))
);

gulp.task('js-watch', gulp.series('babel', (done) => {

  done();
}));

// watcher
gulp.task('watch', gulp.series('sass', 'babel', (done) => {
  gulp.watch(sourceSCSS, gulp.series('sass'));
  gulp.watch(sourceJS, gulp.series('js-watch'));

  done()
}));

gulp.task('default', gulp.task('watch'));