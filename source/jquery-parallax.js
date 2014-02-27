/*!
Plugin:  jquery-parallax
Version  1.1
Author:  Víctor 'vxc' Ortega
URL: 	 http://www.vxc.es/
GitHub:  https://github.com/vxc-/jquery-parallax

2014, Licensed under the MIT and GPL licenses.
*/

if (!jQuery) { throw new Error("jquery-parallax Engine requires jQuery"); }


(function( $ ){

	var $window = $(window);
	var $windowHeight;
	
	var Parallax = {
			
			//Object vars
			defaults : {},
			
			element : null,
			
			bgXunit : 'px',
			
			bgXvalue : 0,
			
			bgYunit : 'px',
			
			bgYvalue : 0,
			
			elementTop: 0,
			
			proxyTransition : function(){},
			
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
				
				$this.defaults = $.extend({}, $.fn.parallax.DEFAULTS, options); 
			
				$this.dispatchTransitionType();
				
				$this.parseBGPosition();
				
				var transition = $this.defaults.transitionType;
				
				//Tuning speed for % positioned images TODO: Rework all this
				if ( (transition == 'vertical' && $this.bgYunit == '%' ) || (transition == 'horizontal' && $this.bgXunit == '%' ) ) {
					$this.defaults.speed = $this.defaults.speed / 4;
				}
				
			},
			
			dispatchTransitionType : function() {
				
				var $this = this;
				
				switch ($this.defaults.transitionType) {
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
				var defaults = this.defaults;
				
				if (defaults.outerHeight)
					return element.outerHeight(true);
				else
					return element.height();
					
			},
			
			parseBGPosition : function () {
				
				var IEtranslations = {
						top: {x : '50%', y: '0px'},
						bottom: {x: '50%', y: '100%'},
				};
				
				var $this = this;
				
				var pattern = new RegExp(/[-+]?\d*\.?\d*/);
				
				var BGPosArr = $this.element.css('background-position').split(" ");
				
				//IExplorer possible clase
				if (BGPosArr.length == 1){
					//Matching key in translation object
					if (BGPosArr[0] in IEtranslations){
						var matchKey = BGPosArr[0];
						var match = IEtranslations[matchKey];
						BGPosArr[0] = match.x;
						BGPosArr[1] = match.y;
					//If it doesn't match is always 50%
					}else{
						BGPosArr[1] = '50%';
					}
				}
				
				$this.bgXunit = BGPosArr[0].replace(pattern, '');
				$this.bgYunit = BGPosArr[1].replace(pattern, '');
				
				$this.bgXvalue = parseFloat(BGPosArr[0].replace($this.bgXunit, ''));				
				$this.bgYvalue = parseFloat(BGPosArr[1].replace($this.bgYunit, ''));
				
				
				if ($this.bgXvalue == 0){
					$this.bgXunit = 'px';
				}
				
				if ($this.bgYvalue == 0){
					$this.bgYunit = 'px';
				}
				
			},
			
			renderVertical : function(currentPos) {
				
				var $this = this;
				
				$this.element.css('background-position', 
						$this.bgXvalue+$this.bgXunit + ' ' + ($this.bgYvalue + Math.round((currentPos - $this.elementTop) * $this.defaults.speed)) + $this.bgYunit);			
			},
			
			renderHorizontal : function(currentPos) {
				
				var $this = this;
				
				$this.element.css('background-position', 
						($this.bgXvalue + Math.round((currentPos - $this.elementTop) * $this.defaults.speed)) + $this.bgXunit) + ' ' + $this.bgYvalue+$this.bgYunit;
			},
			
			renderDiagonal : function(currentPos) {
				
				var $this = this;
				
				var movCalc = Math.round((currentPos - $this.elementTop) * $this.defaults.speed);
				
				this.element.css('background-position', 
						(($this.bgXvalue + movCalc ) + $this.bgXunit) + " " + (($this.bgYvalue + movCalc ) + $this.bgYunit));
				
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
			outerHeight : true,
			transitionType: 'vertical',
	};
	
	$('.parallax.index').parallax({speed: 0.3, transitionType: 'vertical'});
	$('.parallax.projects').parallax({speed: 0.6});
	
})(jQuery);

