/* globals define */
define(function(require, exports, module) {

	'use strict';

	// import dependencies
	var Engine = require('famous/core/Engine');
	var Modifier = require('famous/core/Modifier');
	var Transform = require('famous/core/Transform');
	var ImageSurface = require('famous/surfaces/ImageSurface');
	var Utility = require('famous/utilities/Utility');

	// import the AppView class using require
	var AppView = require('views/AppView');
	var Data = require('data/Data');

	//require(['preloadjs']);

	// simple Get request to the Picasa api with callback
	//Utility.loadURL(SlideData.getUrl(), initApp);

	var mainContext = Engine.createContext();

	// Preload initial video
	//console.log(preloadjs)
	//var preload = new preloadjs.LoadQueue();
	// preload.addEventListener("fileload", handleFileComplete);
	// preload.loadFile('content/videos/bg_1.mov');
	// function handleFileComplete(event) {
	//
	// }
	initApp(Data);


	function initApp(data) {
		 console.log(data);

		 // instantiates AppView with our url data
		 var appView = new AppView({ data : data });

		 mainContext.add(appView);
	 }

});
