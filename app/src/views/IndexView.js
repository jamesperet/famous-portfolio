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
    var VideoSurface = require('famous/surfaces/VideoSurface');
    var Timer = require('famous/utilities/Timer');
    require('jquery')

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
	   this.options.menuLevel = 0;
	   this.createButtons(this.options.data, this.options.menuLevel);
	   
	   this.options.btns = new Array;
	   this.options.menuBtnModifier = new Array;
	   this.options.submenu1_open = false
	   
	   indexView = this;

    }

    // Establishes prototype chain for EmptyView class to inherit from View
    IndexView.prototype = Object.create(View.prototype);
    IndexView.prototype.constructor = IndexView;

    // Default options for EmptyView class
    IndexView.DEFAULT_OPTIONS = {};

    // Define your helper functions and prototype methods here
    
    function _background() {
	    _videoBG.call(this);
	    //_photoBG.call(this);
     }
	
	function _photoBG() {
          var photoSize = this.options.size;

          var photo = new BkImageSurface({
              size: [undefined, undefined],
              content: "https://s3-sa-east-1.amazonaws.com/j1x/projects/portfolio-go/cave-1.jpg",
    		    sizeMode: BkImageSurface.SizeMode.ASPECTFILL,
              properties: {
                  zIndex: 1
              }
          });

    	  	this.background = photo;

          this.photoModifier = new StateModifier({
              origin: [0.5, 0],
              align: [0.5, 0],
              transform: Transform.translate(0, 0, 0)
          });

          this.mainNode.add(this.photoModifier).add(photo);
	}
	
	function _videoBG() {
          var photoSize = this.options.size;

          var photo = new VideoSurface({
              size: [undefined, undefined],
   		 autoplay: true,
   		 src: "content/videos/bg_1.mov",
   		 classes: ['bg_video'],
              properties: {
                  zIndex: 1,
              }
          });
   	  	photo.setAttributes({ 
   	        loop: '' 
   	     });

   	  	this.background = photo;

          this.photoModifier = new StateModifier({
              origin: [0.5, 0],
              align: [0.5, 0],
              transform: Transform.translate(0, 0, 0)
          });

          this.mainNode.add(this.photoModifier).add(photo);

	}
	
	
     IndexView.prototype.createButtons = function(data, level) {
		console.log(data);
		this.options.menuLevel = level
		btns = [];
		menuBtnModifier = [];
		if(level == 1){
			this.level1_btns = [];
			this.level1_menuBtnModifier = []
		}
		for (var i = 0; i < data.navigation.length; i++) {
			var title = data.navigation[i].title
			var btn = new Surface({
				size: [true, true],
				content: title,
				classes: ['btn-menu'],
				attributes: { id: data.navigation[i].id },
				properties: {
					zIndex: 2
				}
			});
			btns.push(btn);

			menuBtnModifier[i] = new StateModifier({
			  origin: [0, 0],
			  align: [0, 0],
			  opacity: 0,
			  transform: Transform.translate(120 * level, 100 + (20 * i), 0)
			});
			
			if(level == 1){
				this.level1_btns.push(btn)
				this.level1_menuBtnModifier.push(menuBtnModifier[i])
			}

			this.add(menuBtnModifier[i]).add(btn);
			
			if (data.navigation[i].type == 'content') {
		   		btn.on('click', function(e) {
		   			 this._eventOutput.emit('load-slideshow-' + e.toElement.id, e.toElement.id);
		   			 console.log("clicked on " + e.toElement.id);
					 console.log(this);
		   		}.bind(this));
			} else if (data.navigation[i].type == 'sub-nav') {
		   		btn.on('click', loadSubmenuEvent);
				console.log(this.level0_submenus);
			}
			
			console.log("finished pre-building btn " + i + ' level ' + level);
		};
		
		var i = 0
		this.on('open-menu-' + level, function() {
			_animateBtns(i, menuBtnModifier, data.navigation.length, level);
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
	
	var loadSubmenuEvent = function(e) {
		if(indexView.options.submenu1_open == true){
			indexView.closeSubmenu(0, indexView.level1_menuBtnModifier, indexView.level1_menuBtnModifier.length, 1)
			indexView.options.submenu1_open = false;
		}
		console.log("clicked on " + e.toElement.id);
		indexView._eventOutput.emit('load-submenu-' + e.toElement.id, e.toElement.id);
	 	this.removeListener('click', loadSubmenuEvent);
		this.on('click', closeSubmenuEvent);
		indexView.options.submenu1_open = true;
		indexView.options.submenu1 = this;
		indexView.options.submenu1_id = e.toElement.id;
	}
	
	var closeSubmenuEvent = function(e) {
		console.log("clicked on close " + e.toElement.id);
		indexView._eventOutput.emit('close-submenu-' + e.toElement.id, e.toElement.id);
		this.removeListener('click', closeSubmenuEvent);
		this.on('click', loadSubmenuEvent);
		indexView.options.submenu1_open = false;
	}
	
	IndexView.prototype.closeSubmenu = function(i, menuBtnModifier, menuLength, level) {
		if (i < menuLength) {
			menuBtnModifier[i].setOpacity(  
				0,
				{duration: 100}
			);

			menuBtnModifier[i].setTransform(  
			    Transform.translate(120 * level, 100 + (20 * i), 0),
			    {duration: 100},
			    function() {
				    i++;
				    if (i < menuLength) {
					    console.log('level ' + level + ' | i ' + i)
				    		indexView.closeSubmenu(i, menuBtnModifier, menuLength, level);
			         }
			    }
			);
		}
	}
	
	function _animateBtns(i, menuBtnModifier, menuLength, level) {
		if (i < menuLength) {
			console.log('level: ' + level + ' | opening menu ' + i + ' | length: ' + menuLength);
			menuBtnModifier[i].setOpacity(  
				1,
				{duration: 100}
			);

			menuBtnModifier[i].setTransform(  
			    Transform.translate(120 * level, 100 + (20 * i), 0),
			    {duration: 100},
			    function() {
				    i++;
				    if (i < menuLength) {
					    console.log('level ' + level + ' | i ' + i)
				    		_animateBtns(i, menuBtnModifier, menuLength, level);
			         }
			    }
			);
		}
	}
	
	IndexView.prototype.resetBtns = function(btns, menuBtnModifier){
		
          this.photoModifier.setOpacity(0);
		this.photoModifier.setOpacity(1, {duration: 800, curve: 'easeInOut'});

		for (var i = 0; i < btns.length; i++) {
			menuBtnModifier[i].setOpacity(0);
			console.log(menuBtnModifier[i].getTransform()),
			menuBtnModifier[i].setTransform(
				Transform.translate(menuBtnModifier[i].getTransform()[12], [13], 0)
			);
		}
	}

    module.exports = IndexView;
});
