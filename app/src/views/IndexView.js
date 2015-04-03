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
	   
	   _createPhoto.call(this);
    }

    // Establishes prototype chain for EmptyView class to inherit from View
    IndexView.prototype = Object.create(View.prototype);
    IndexView.prototype.constructor = IndexView;

    // Default options for EmptyView class
    IndexView.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here
    
    function _createPhoto() {
       var photoSize = this.options.size;

       var photo = new BkImageSurface({
           size: [undefined, undefined],
           content: "https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/cave.jpg",
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
	  
	  photo.on('click', function() {
	  	 this._eventOutput.emit('load-slideshow-1');
		 console.log('load-slideshow-1');
	  }.bind(this));

    }

    module.exports = IndexView;
});
