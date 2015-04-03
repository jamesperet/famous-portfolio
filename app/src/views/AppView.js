/*** AppView ***/

// define this module in Require.JS
define(function(require, exports, module) {

	// Import additional modules to be used in this view 
	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var EventHandler = require('famous/core/EventHandler');
	var Lightbox = require('famous/views/Lightbox');
	var Easing = require('famous/transitions/Easing');
	
	var IndexView = require('views/IndexView');
	var SlideshowView = require('views/SlideshowView');
	
	var eventHandler = new EventHandler();
	
	// Constructor function for our EmptyView class
	function AppView() {
		
		View.apply(this, arguments);

		this.rootModifier = new StateModifier({
		    size: this.options.size,
		    origin: [0.5, 0],
		    align: [0.5, 0]
		});
		
		this.mainNode = this.add(this.rootModifier);
		_createLightbox.call(this);
		_createSlides.call(this);

	}
	
	// Establishes prototype chain for EmptyView class to inherit from View
	AppView.prototype = Object.create(View.prototype);
	AppView.prototype.constructor = AppView;
	
	// Default options for EmptyView class
	AppView.DEFAULT_OPTIONS = {};
	var lightboxOpts = {};
	// Define your helper functions and prototype methods here
	
	
	
	function _createLightbox() {
	    this.lightbox = new Lightbox(lightboxOpts);
	    this.mainNode.add(this.lightbox);
	}
	
	function _createSlides() {
		this.slides = [];
		this.currentIndex = 0;
		
		var indexView = new IndexView({
			data: this.options.data
		});
		
		var slideshowView = new SlideshowView({
		   data: this.options.data
		});
		
		this.slides.push(indexView);
		indexView.on('click', this.showNextSlide.bind(this));
		var appView = this;
		indexView.on('load-slideshow-1', function() {
			console.log('loading slideshow 1');
			appView.showNextSlide();
		});
		
		this.slides.push(slideshowView);
		
		this.showCurrentSlide(lightboxOpts);
	}
	
	AppView.prototype.showCurrentSlide = function(options) {
	        var slide = this.slides[this.currentIndex];
		   this.lightbox.setOptions(options)
	        this.lightbox.show(slide);
	};
	
	AppView.prototype.showNextSlide = function() {
		this.currentIndex++;
		if (this.currentIndex === this.slides.length) this.currentIndex = 0;
		var lightboxOpts = {
			inTransform: Transform.translate(window.innerWidth, 0, 0),
			outTransform: Transform.translate(window.innerWidth *-1, 0, 0),
			inTransition: { duration: 1000, curve: Easing.outBack },
			outTransition: { duration: 900, curve: Easing.outBack },
			inOpacity: 1,
			outOpacity: 1,
			overlap: true
		}
		this.showCurrentSlide(lightboxOpts);
	};
	
	module.exports = AppView;
});
