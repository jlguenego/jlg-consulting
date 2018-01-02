'use strict';

const express = require('express'); // charge ExpressJS
const serveIndex = require('serve-index');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');

var app = express();

app.use(function(req, res, next) {
	console.log('req.url', req.url);
	next();
});

webpackConfig.output.path = '/';
const compiler = webpack(webpackConfig);
app.use('/app/wpk/', webpackDevMiddleware(compiler, {}));

const urls = ['clients', 'ux', 'web', 'contact', '1234'];
['en', 'fr'].forEach(lang => {
	['app', 'dist'].forEach(dir => {
		const array = urls.map(n => `/${dir}/${lang}/${n}`);
		app.use(array, (req, res, next) => {
			res.sendFile(`./${dir}/${lang}/index.html`, { root: __dirname });
		});
	});
});

app.use(express.static('.'));
app.use(serveIndex('.', { icons: true }));

app.use(function(req, res, next) {
	console.log('404: Page not Found', req.url);
	next();
});

app.listen(8000, function() {
	console.log('server started on port 8000');
});
