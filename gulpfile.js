const gulp = require('gulp');

const pathConfig = {
	base: 'app',
	dist: 'dist',
	zipSrc: ['dist/**/*', 'dist/.htaccess'],
	zip: 'dist.zip',
	wpk: 'app/wpk',
	indexHtml: 'app/**/index.html',
	htaccess: ['app/.htaccess.tmpl'],
	resources: ['app/img/**/*'],
};

require('./gulp/eslint.js')(gulp);
require('./gulp/config.js')(gulp, pathConfig);
require('./gulp/clean.js')(gulp, pathConfig);
require('./gulp/build.js')(gulp, pathConfig);
require('./gulp/deploy.js')(gulp, pathConfig);

gulp.task('default', ['rebuild']);
