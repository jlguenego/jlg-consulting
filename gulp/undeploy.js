const runSequence = require('run-sequence');
const rp = require('request-promise');
const gutil = require('gulp-util');
const ftp = require('gulp-ftp');

const cfgUtils = require('../cfg/utils.js');

module.exports = function(gulp, pathConfig) {

	gulp.task('undeploy:ftp', function() {
		const deployEnv = cfgUtils.getEnv('deploy');
		
		return gulp.src(pathConfig.undeploy)
			.pipe(ftp(deployEnv.ftp))
			.pipe(gutil.noop());
	});

	gulp.task('undeploy:remove', function(callback) {
		const deployEnv = cfgUtils.getEnv('deploy');
		rp(deployEnv.url + 'remove.php')
			.then(function(htmlString) {
				
				callback();
			})
			.catch(function(err) {
				
				throw err;
			});
	});

	gulp.task('undeploy', function() {
		runSequence('undeploy:ftp', 'undeploy:remove');
	});
};
