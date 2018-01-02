import './lang-en.scss';


import homeHtml from './tmpl/home.html';
import clientsHtml from './tmpl/clients.html';
import uxHtml from './tmpl/ux.html';
import webHtml from './tmpl/web.html';
import contactHtml from './tmpl/contact.html';


const app = angular.module('jlg-route', ['ui.router']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);
	$urlRouterProvider.otherwise('/');

	$stateProvider.state({
		name: 'home',
		url: '/',
		template: homeHtml
	});
	$stateProvider.state({
		name: 'clients',
		url: '/clients',
		template: clientsHtml
	});
	$stateProvider.state({
		name: 'ux',
		url: '/ux',
		template: uxHtml
	});
	$stateProvider.state({
		name: 'web',
		url: '/web',
		template: webHtml
	});
	$stateProvider.state({
		name: 'contact',
		url: '/contact',
		template: contactHtml
	});
	
});
