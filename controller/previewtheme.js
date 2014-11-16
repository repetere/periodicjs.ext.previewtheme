'use strict';

var Utilities = require('periodicjs.core.utilities'),
	ControllerHelper = require('periodicjs.core.controller'),
	// ejs = require('ejs'),
	fs = require('fs-extra'),
	path = require('path'),
	User,
	restartfile = path.join(process.cwd(), '/content/extensions/restart.json'),
	CoreUtilities,
	CoreController,
	appSettings,
	appenvironment,
	previewthemeSettingsFilename = path.resolve(process.cwd(), 'content/config/extensions/periodicjs.ext.previewtheme/settings.json'),
	previewThemeSettingsConfig,
	previewThemeSettings,
	mongoose,
	logger;

/**
 * post handler for switching theme
 * @param  {object} req
 * @param  {object} res
 * @return {object} responds with previewtheme page
 */
var switchTheme = function (req, res, next) {
	var previewthemename = req.params.themename,
		newpreviewThemeSettingsConfig = previewThemeSettingsConfig;

	newpreviewThemeSettingsConfig[appenvironment].themename = previewthemename;
	if (previewthemename === 'initial') {
		req.session.themename = undefined;
	}
	if (!User.hasPrivilege(req.user, 740)) {
		next(new Error('EXT-UAC740: You don\'t have access to modify settings'));
	}
	else {
		fs.writeJson(previewthemeSettingsFilename, newpreviewThemeSettingsConfig, function (err) {
			if (err) {
				CoreController.handleDocumentQueryErrorResponse({
					err: err,
					res: res,
					req: req
				});
			}
			else {
				CoreController.handleDocumentQueryRender({
					req: req,
					res: res,
					redirecturl: '/p-admin/settings',
					responseData: {
						result: 'success',
						data: 'previewtheme config updated'
					},
					callback: function () {
						CoreUtilities.restart_app({
							restartfile: restartfile
						});
					}
				});
			}
		});
	}
};

/**
 * uploads seeds via admin interface
 * @param  {object} req
 * @param  {object} res
 * @return {object} responds with previewtheme page
 */
var getThemeName = function () {
	return previewThemeSettings.themename;
};

/**
 * uploads seeds via admin interface
 * @param  {object} req
 * @param  {object} res
 * @return {object} responds with previewtheme page
 */
var preDataQuery = function (req, res, next) {
	var previewhtml = '';
	if (req.session.themename !== 'initial') {
		previewhtml += '<script>window.previewtheme="' + req.session.themename + '";</script>';
	}
	previewhtml += '<script src="/extensions/periodicjs.ext.previewtheme/js/previewtheme.min.js"></script>';

	res.locals.additionalFooterHTML.previewthemejs = previewhtml;
	next();
};

// /**
//  * add google analytics to footer
//  * @param  {object} serverobj object passed from core.controller.handleDocumentQueryRender that has {req,res}
//  * @param  {object} asynccallback
//  * @return {Function} adds google analytics to footer
//  */
// var postDataQueryFunction = function(serverobj,asynccallback){
// 	var returnfunction = function(serverobj,asynccallback){
// 		try{		
// 			serverobj.res.locals.additionalFooterHTML.previewtheme=analyticstrackingtemplatehtml;
// 			asynccallback(null);
// 		}
// 		catch(e){
// 			asynccallback(e);
// 		}
// 	};

// 	return returnfunction(serverobj,asynccallback);
// };

/**
 * previewtheme controller
 * @module previewthemeController
 * @{@link https://github.com/typesettin/periodicjs.ext.previewtheme}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @requires module:async
 * @requires module:periodicjs.core.utilities
 * @requires module:periodicjs.core.controller
 * @param  {object} resources variable injection from current periodic instance with references to the active logger and mongo session
 * @return {object}           previewtheme
 */
var controller = function (resources) {
	logger = resources.logger;
	mongoose = resources.mongoose;
	appSettings = resources.settings;
	appenvironment = appSettings.application.environment;
	CoreController = new ControllerHelper(resources);
	CoreUtilities = new Utilities(resources);
	User = mongoose.model('User');
	previewThemeSettingsConfig = fs.readJsonSync(previewthemeSettingsFilename);
	previewThemeSettings = previewThemeSettingsConfig[appenvironment];

	return {
		preDataQuery: preDataQuery,
		switchTheme: switchTheme,
		getThemeName: getThemeName
			// postDataQueryFunction: postDataQueryFunction
	};
};

module.exports = controller;
