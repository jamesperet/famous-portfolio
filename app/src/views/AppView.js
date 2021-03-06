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
	var lightboxOpts = {
			inTransform: Transform.translate(0, 0, 1),
			outTransform: Transform.translate(0, 0, 1),
			inTransition: { duration: 1000, curve: Easing.outBack },
			outTransition: { duration: 900, curve: Easing.outBack },
			inOpacity: 0,
			outOpacity: 1,
			overlap: false
	};
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
		this.options.indexView = indexView;
		
		this.slides.push(indexView);
		
		var appView = this;
		
		for (var i = 0; i < this.options.data.content.length; i++) {
			
			var slideshowView = new SlideshowView({
				indexView: indexView,
				data: this.options.data,
			     slides: this.options.data.content[i].slides
			});
			
			this.slides.push(slideshowView);
			
			indexView.on('load-slideshow-' + i, function(e) {
				e++;
				var lightboxOpts = {
					inTransform: Transform.translate(0, 0, 1),
					outTransform: Transform.translate(0, 0, 0),
					inTransition: { duration: 1000, curve: Easing.outBack },
					outTransition: { duration: 1000, curve: Easing.outBack },
					inOpacity: 0,
					outOpacity: 0,
					overlap: true,
				}
				console.log('loading page ' + e);
				appView.showPage(e, lightboxOpts);
			});
			
			slideshowView.on('load-index', function() {
				console.log('loading Index');
				var lightboxOpts = {
					inTransform: Transform.translate(0, 0, 0),
					outTransform: Transform.translate(0, 0, 1),
					inTransition: { duration: 1000, curve: Easing.outBack },
					outTransition: { duration: 1000, curve: Easing.outBack },
					inOpacity: 0,
					outOpacity: 0,
					overlap: false,
				}
				console.log(this);
				var index = this.options.indexView;
				console.log(index);
				//index.resetBtns(index.options.btns, index.options.menuBtnModifier);
				appView.showPage(0, lightboxOpts);
			});
		};
		
		for (var i = 0; i < this.options.data.navigation.length; i++) {
			if(this.options.data.navigation[i].type == 'sub-nav'){
				indexView.on('load-submenu-' + this.options.data.navigation[i].id, function(e) {
					for(var i = 0; i < this.options.data.navigation.length; i++ ){
						if (this.options.data.navigation[i].id == e){
							data = this.options.data.navigation[i];
							indexView.on('close-submenu-' + this.options.data.navigation[i].id, function(e) {
								indexView.closeSubmenu(0, indexView.level1_menuBtnModifier, indexView.level1_btns.length, 1);
							});
						}
					}
					indexView.createButtons(data, 1);
					indexView._eventOutput.emit('open-menu-1');
					
				});
			}
		};
		
		
		
		
		
		this.slides.push(slideshowView);
		
		this.showCurrentSlide(lightboxOpts, true);
	}
	
	AppView.prototype.showCurrentSlide = function(options, loadMenu) {
		   loadMenu = loadMenu || false;
	        var slide = this.slides[this.currentIndex];
		   this.lightbox.setOptions(options)
	        this.lightbox.show(slide, function(){
	        	console.log('start menu animation')
		   	if(loadMenu == true){
				slide._eventOutput.emit('open-menu-0');
			}
	        });
	};
	
	AppView.prototype.showPage = function(page_number, lightboxOpts, loadMenu) {
		loadMenu = loadMenu || false;
		this.currentIndex = page_number;
		this.showCurrentSlide(lightboxOpts, loadMenu);
	};
	
	module.exports = AppView;
});
