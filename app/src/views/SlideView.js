/*** SlideView ***/

// define this module in Require.JS
define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var BkImageSurface = require('famous-bkimagesurface');
    
    var SlideData = require('data/SlideData');

    // Constructor function for our EmptyView class
    function SlideView() {

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
    SlideView.prototype = Object.create(View.prototype);
    SlideView.prototype.constructor = SlideView;

    // Default options for EmptyView class
    SlideView.DEFAULT_OPTIONS = {
        	size: [undefined, undefined],
	     photoUrl: SlideData.defaultImage
    };

    // Define your helper functions and prototype methods here

    // the _ before the function name indicates it's a private function
    
    function _createPhoto() {
       var photoSize = this.options.size;

       var photo = new BkImageSurface({
           size: [this.options.size[0], this.options.size[1]],
           content: this.options.photoUrl,
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

    module.exports = SlideView;
    
    
});
