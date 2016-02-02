/* variables */
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var nib = require('nib');
var minifyCSS = require('gulp-minify-css');

/* configuration */
var config = {
	styles: {
		main: './src/styles/main.styl',
		watch: './src/styles/**/*.styl',
		output: './public/css'
	},
	html: {
		watch: './public/*.html'
	}
};

/* gulp server */
gulp.task('server', function() {
	gulp.src('./public')
			.pipe(webserver({
				host: '0.0.0.0',
				port: 8080,
				livereload: true
			}));
	});

/* stylus to css */
gulp.task('public:css', function() {
	gulp.src(config.styles.main)
			.pipe(stylus({
				use: nib(),
				'include css': true
			}))
			.pipe(minifyCSS())
			.pipe(gulp.dest(config.styles.output));
});

/* watch for changes */
gulp.task('watch', function() {
	gulp.watch(config.styles.watch, ['public:css']);
	gulp.watch(config.html.watch, ['public']);
});

/* gulp public build */
gulp.task('public', ['public:css']);

/* gulp default */
gulp.task('default', ['server', 'watch', 'public']);