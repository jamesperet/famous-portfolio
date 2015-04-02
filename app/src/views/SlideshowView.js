/*** SlideshowView ***/

// define this module in Require.JS
define(function(require, exports, module) {

	// Import additional modules to be used in this view 
	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	
	var SlideView = require('views/SlideView');
	var Lightbox = require('famous/views/Lightbox');
	
	function SlideshowView() {
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
	
	SlideshowView.prototype = Object.create(View.prototype);
	SlideshowView.prototype.constructor = SlideshowView;
	
	SlideshowView.DEFAULT_OPTIONS = {
		size: [undefined, undefined],
		data: undefined,
		lightboxOpts: {}
	};

	// Define your helper functions and prototype methods here
	
	function _createLightbox() {
	    this.lightbox = new Lightbox(this.options.lightboxOpts);
	    this.mainNode.add(this.lightbox);
	}
	
	function _createSlides() {
		this.slides = [];
		this.currentIndex = 0;
		
		for (var i = 0; i < this.options.data.length; i++) {
		    var slide = new SlideView({
		        size: this.options.size,
		        photoUrl: this.options.data[i]
		    });
		
		    this.slides.push(slide);
		    slide.on('click', this.showNextSlide.bind(this));
		}
		this.showCurrentSlide();
	}
	
	SlideshowView.prototype.showCurrentSlide = function() {
	        var slide = this.slides[this.currentIndex];
	        this.lightbox.show(slide);
	};
	
	SlideshowView.prototype.showNextSlide = function() {
	        this.currentIndex++;
	        if (this.currentIndex === this.slides.length) this.currentIndex = 0;
	        this.showCurrentSlide();
	    };
	
	module.exports = SlideshowView;
});