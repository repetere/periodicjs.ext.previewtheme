'use strict';

/**
 * preview themes without effecting the site.
 * @{@link https://github.com/typesettin/periodicjs.ext.previewtheme}
 * @author Yaw Joseph Etse
 * @copyright Copyright (c) 2014 Typesettin. All rights reserved.
 * @license MIT
 * @exports periodicjs.ext.previewtheme
 * @param  {object} periodic variable injection of resources from current periodic instance
 */
module.exports = function (periodic) {
	// express,app,logger,config,db,mongoose
	var previewthemeController = require('./controller/previewtheme')(periodic);

	periodic.app.post('/p-admin/previewtheme/switchtheme/:themename', previewthemeController.switchTheme);

	//pre data query
	periodic.app.get('/p-admin/themes', previewthemeController.preDataQuery);
	periodic.app.get('/p-admin/theme/:id', previewthemeController.preDataQuery);
	periodic.app.get('*', function (req, res, next) {
		var setthemenametest = req.session && req.isAuthenticated() && previewthemeController.getThemeName() !== 'initial' && req.session.themename !== previewthemeController.getThemeName();
		if (setthemenametest) {
			req.session.themename = previewthemeController.getThemeName();
		}
		next();
	});
	//post data query
	// periodic.app.locals.additionalHTMLFunctions.push( previewthemeController.postDataQueryFunction );	
};
