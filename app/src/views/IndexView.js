/*** IndexView ***/

// define this module in Require.JS
define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var EventHandler = require('famous/core/EventHandler');
    var BkImageSurface = require('famous-bkimagesurface');

	var eventHandler = new EventHandler();

    // Constructor function for our EmptyView class
    function IndexView() {

        // Applies View's constructor function to EmptyView class
        View.apply(this, arguments);
	   
	   this.rootModifier = new StateModifier({
	    size : [undefined, undefined],
	    properties : {
	        objectFit: 'cover'
	    }
	   });
        
	   // saving a reference to the new node
	   this.mainNode = this.add(this.rootModifier);
	   
	   _background.call(this);
	   _createButtons.call(this);
    }

    // Establishes prototype chain for EmptyView class to inherit from View
    IndexView.prototype = Object.create(View.prototype);
    IndexView.prototype.constructor = IndexView;

    // Default options for EmptyView class
    IndexView.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here
    
    function _background() {
       var photoSize = this.options.size;

       var photo = new BkImageSurface({
           size: [undefined, undefined],
           content: "https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/cave-1.jpg",
		 sizeMode: BkImageSurface.SizeMode.ASPECTFILL,
           properties: {
               zIndex: 1
           }
       });

       this.photoModifier = new StateModifier({
           origin: [0.5, 0],
           align: [0.5, 0],
           transform: Transform.translate(0, 0, 0)
       });

       this.mainNode.add(this.photoModifier).add(photo);

     }
	
	
    
	function _createButtons() {
		var btns = [];
		var menuBtnModifier = [];
		for (var i = 0; i < this.options.data.content.length; i++) {
			var title = this.options.data.content[i].title
			var btn = new Surface({
				size: [120, true],
				content: title,
				classes: ['btn-menu'],
				attributes: { id: [i] },
				properties: {
					zIndex: 2
				}
			});
			btns.push(btn);
			btn.options.index = i
			
			menuBtnModifier[i] = new StateModifier({
			  origin: [0, 1],
			  align: [0, 1],
			  opacity: 0,
			  transform: Transform.translate(135 * i, 100, 0)
			});
			

		     //this.add(nextBtnModifier).add(btnNext);
			this.add(menuBtnModifier[i]).add(btn);
		
		   	btn.on('click', function(e) {
		   		 this._eventOutput.emit('load-slideshow-' + e.toElement.id, e.toElement.id);
		   		 console.log("clicked on " + e.toElement.id);
		   	}.bind(this));
			
			console.log("finished pre-building menu");
			console.log(i);
		};
		console.log(btns.length);
		
		var i = 0
		this.on('open-menu', function() {
			_animateBtns(i, menuBtnModifier, this.options.data.content.length);
		});
		
	     //
		//btnNext.on('click', function() {
		//	this._eventOutput.emit('click');
		//	this.showNextSlide();
		//}.bind(this));
	     //
		//btnBack.on('click', function() {
		//	this._eventOutput.emit('click');
		//	this.showPreviousSlide();
		//}.bind(this));
	}
	
	function _animateBtns(i, menuBtnModifier, length) {
		if (i < length) {
			console.log('opening menu ' + i);
			menuBtnModifier[i].setOpacity(  
				1,
				{duration: 100, curve: 'easeInOut'}
			);

			menuBtnModifier[i].setTransform(  
			    Transform.translate(135 * i, -15, 0),
			    {duration: 200, curve: 'easeInOut'},
			    function() {
				    i++;
				    _animateBtns(i, menuBtnModifier, length);
			    }
			);
		}
	}

    module.exports = IndexView;
});
