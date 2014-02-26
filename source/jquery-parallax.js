/*
Plugin:  jquery-parallax
Version  1.0
Author:  Víctor 'vxc' Ortega
URL: 	 http://www.vxc.es/
GitHub:  https://github.com/vxc-/jquery-parallax

2014 - Licensed under the MIT and GPL licenses.
*/

if (!jQuery) { throw new Error("jquery-parallax Engine requires jQuery"); }


(function( $ ){

	var $window = $(window);
	var $windowHeight;
	
	var Parallax = {
			
			//Object vars
			$defaults : {},
			
			element : null,
			
			elementTop: 0,
			
			$proxyTransition : function(){},
			
			__init : function( element, options){
				
				var $this = this;
				
				$this.element = $(element);
				
				$this.$id = $this.element.attr('class');
					
				//Set options
				$this.setConfig(options);		
				
				$this.bindHandlers();
				
				$this.render();
			},

			setConfig : function(options) {
				
				var $this = this;
				
				$this.$defaults = $.extend({}, $.fn.parallax.DEFAULTS, options); 
			
				$this.dispatchTransitionType();
				
				//TODO: this.translateBGPosition();
			},
			
			dispatchTransitionType : function() {
				
				var $this = this;
				
				switch ($this.$defaults.transitionType) {
					case 'vertical':
						$this.proxyTransition  = $.proxy($this.renderVertical, $this);
						break;
					case 'horizontal':
						$this.proxyTransition  = $.proxy($this.renderHorizontal, $this);
						break;
					case 'diagonal':
						$this.proxyTransition  = $.proxy($this.renderDiagonal, $this);
						break;
				}
				
			},
			
			getHeight : function() {
				
				var element = this.element;
				var $defaults = this.$defaults;
				
				if ($defaults.outerHeight)
					return element.outerHeight(true);
				else
					return element.height();
					
			},
			
			renderVertical : function(currentPos) {
				var $this = this;
				var $defaults = $this.$defaults;
				$this.element.css('backgroundPosition', $defaults.xBGPos + " " + Math.round(($this.elementTop - currentPos) * $defaults.speed) + "px");
			},
			
			renderHorizontal : function(currentPos) {
				var $this = this;
				var $defaults = $this.$defaults;
				this.element.css('backgroundPosition', Math.round(( $this.elementTop - currentPos) * $defaults.speed) + "px "  + $defaults.yBGPos);
			},
			
			renderDiagonal : function(currentPos) {
				var $this = this;
				var $defaults = $this.$defaults;
				this.element.css('backgroundPosition', Math.round(( currentPos) * $defaults.speed) + "px "  + Math.round(( $this.elementTop - currentPos) * $defaults.speed) + "px");
			},
			
			render : function(){
				
				var $this = this;			
				var currentPos = $window.scrollTop();
				$this.elementTop = $this.element.offset().top;
				var elementHeight = $this.getHeight();

				//Return if we are not within viewport
				if ($this.elementTop + elementHeight < currentPos || $this.elementTop > currentPos + $windowHeight) {
					return;
				}
				
				$this.proxyTransition(currentPos);

			},
			
			bindHandlers : function() {
				
				var $this = this;
				
				$(window).bind('scroll', function() {
					$this.render();
				}).resize(function(){
					$this.render();
				});
				
			},
			
	};
	
	//Global Scope Listener
	$windowHeight = $window.height();
	$window.resize(function () {
		$windowHeight = $window.height();
	});
	
	//Constructor definition
	if ( typeof Object.create !== "function" ) {
		Object.create = function( obj ) {
			function Fun() {};
			Fun.prototype = obj;
			return new Fun();
		};
	}
	
	$.fn.parallax = function( options ){
		return this.each(function() {

			var parallax = Object.create( Parallax );
			parallax.__init( this, options );
			//$(this).data('Parallax', parallax);	
			
		});
		
	};
	
	$.fn.parallax.DEFAULTS = {
			speed : 0.5,
			xBGPos : "50%",
			yBGPos : "50%",
			outerHeight : true,
			transitionType: 'vertical',
	};
	
})(jQuery);

