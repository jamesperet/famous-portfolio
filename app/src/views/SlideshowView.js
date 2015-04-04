/*** SlideshowView ***/

// define this module in Require.JS
define(function(require, exports, module) {

	// Import additional modules to be used in this view 
	var View = require('famous/core/View');
	var Surface = require('famous/core/Surface');
	var Transform = require('famous/core/Transform');
	var StateModifier = require('famous/modifiers/StateModifier');
	var Lightbox = require('famous/views/Lightbox');
	var Easing = require('famous/transitions/Easing');
	
	var SlideView = require('views/SlideView');	
	
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
		_createButtons.call(this);
	}
	
	SlideshowView.prototype = Object.create(View.prototype);
	SlideshowView.prototype.constructor = SlideshowView;
	
	SlideshowView.DEFAULT_OPTIONS = {
		size: [undefined, undefined],
		data: undefined,
	};

	// Define your helper functions and prototype methods here
	
	var backModifier = new StateModifier({
	  // positions the background behind the tab surface
	  transform: Transform.behind
	});
	
	function _createLightbox() {
	    this.lightbox = new Lightbox(this.options.lightboxOpts);
	    this.mainNode.add(this.lightbox);
	}
	
	function _createSlides() {
		this.slides = [];
		this.currentIndex = 0;
		
		for (var i = 0; i < this.options.slides.length; i++) {
		    var slide = new SlideView({
		        size: this.options.size,
		        photoUrl: this.options.slides[i]
		    });
		
		    this.slides.push(slide);
		    //slide.on('click', this.showNextSlide.bind(this));
		}
		this.showCurrentSlide();
	}
	
	var nextBtnModifier = new StateModifier({
	  origin: [1, 1],
	  align: [1, 1]
	});
	
	var backBtnModifier = new StateModifier({
	  origin: [0, 1],
	  align: [0, 1]
	});
	
	var menuBtnModifier = new StateModifier({
	  origin: [0, 0],
	  align: [0, 0]
	});
	
	function _createButtons() {
		var btnBack = new Surface({
			size: [50,50],
			content: '<',
			classes: ['btn-slideshow'],
			properties: {
				textAlign: 'center',
				fontSize: '21px',
				lineHeight: '50px',
				zIndex: 2
			}
		});
		var btnNext = new Surface({
			size: [50,50],
			content: '>',
			classes: ['btn-slideshow'],
			properties: {
				textAlign: 'center',
				fontSize: '21px',
				lineHeight: '50px',
				zIndex: 2
			}
		});
		var btnMenu = new Surface({
			size: [50,50],
			content: '<<',
			classes: ['btn-slideshow'],
			properties: {
				textAlign: 'center',
				fontSize: '21px',
				lineHeight: '50px',
				zIndex: 2
			}
		});
		
	     this.add(nextBtnModifier).add(btnNext);
		this.add(backBtnModifier).add(btnBack);
		this.add(menuBtnModifier).add(btnMenu);
		
		btnNext.on('click', function() {
			this._eventOutput.emit('click');
			this.showNextSlide();
		}.bind(this));
		
		btnBack.on('click', function() {
			this._eventOutput.emit('click');
			this.showPreviousSlide();
		}.bind(this));
		
		btnMenu.on('click', function() {
	   	  	 this._eventOutput.emit('load-index');
	   		 console.log('Load Index Page');
		}.bind(this));
	}
	
	SlideshowView.prototype.showCurrentSlide = function(options) {
	        var slide = this.slides[this.currentIndex];
		   this.lightbox.setOptions(options)
	        this.lightbox.show(slide);
	};
	
	SlideshowView.prototype.showNextSlide = function() {
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
	SlideshowView.prototype.showPreviousSlide = function() {
		this.currentIndex--;
		if (this.currentIndex === -1) this.currentIndex = this.slides.length - 1;
   		var lightboxOpts = {
   			inTransform: Transform.translate(window.innerWidth * -1, 0, 0),
   			outTransform: Transform.translate(window.innerWidth, 0, 0),
   			inTransition: { duration: 1000, curve: Easing.outBack },
   			outTransition: { duration: 900, curve: Easing.outBack },
   			inOpacity: 1,
   			outOpacity: 1,
   			overlap: true
   		}
   		this.showCurrentSlide(lightboxOpts);
	};

	module.exports = SlideshowView;
});
