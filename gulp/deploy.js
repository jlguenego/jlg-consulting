const runSequence = require('run-sequence');
const fs = require('fs');
const Promise = require('bluebird');
Promise.promisifyAll(fs);
const gutil = require('gulp-util');
const ftp = require('gulp-ftp');

const cfgUtils = require('../cfg/utils.js');

module.exports = function(gulp, pathConfig) {

	gulp.task('deploy:config', function(cb) {
	});

	gulp.task('deploy:ftp', function() {
		const deployEnv = cfgUtils.getEnv('deploy');
		return gulp.src(pathConfig.ftp)
			.pipe(ftp(deployEnv.ftp))
			.pipe(gutil.noop());
	});

	gulp.task('deploy', ['clean:zip'], function() {
		runSequence('deploy:config', 'deploy:ftp');
	});
};
