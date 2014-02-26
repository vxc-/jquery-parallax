if(!jQuery){throw new Error("jquery-parallax Engine requires jQuery")}(function(a){var c=a(window);var d;var b={$defaults:{},element:null,elementTop:0,$proxyTransition:function(){},__init:function(f,e){var g=this;g.element=a(f);g.$id=g.element.attr("class");g.setConfig(e);g.bindHandlers();g.render()},setConfig:function(e){var f=this;f.$defaults=a.extend({},a.fn.parallax.DEFAULTS,e);f.dispatchTransitionType()},dispatchTransitionType:function(){var e=this;switch(e.$defaults.transitionType){case"vertical":e.proxyTransition=a.proxy(e.renderVertical,e);break;case"horizontal":e.proxyTransition=a.proxy(e.renderHorizontal,e);break;case"diagonal":e.proxyTransition=a.proxy(e.renderDiagonal,e);break}},getHeight:function(){var e=this.element;var f=this.$defaults;if(f.outerHeight){return e.outerHeight(true)}else{return e.height()}},renderVertical:function(e){var g=this;var f=g.$defaults;g.element.css("backgroundPosition",f.xBGPos+" "+Math.round((g.elementTop-e)*f.speed)+"px")},renderHorizontal:function(e){var g=this;var f=g.$defaults;this.element.css("backgroundPosition",Math.round((g.elementTop-e)*f.speed)+"px "+f.yBGPos)},renderDiagonal:function(e){var g=this;var f=g.$defaults;this.element.css("backgroundPosition",Math.round((e)*f.speed)+"px "+Math.round((g.elementTop-e)*f.speed)+"px")},render:function(){var g=this;var e=c.scrollTop();g.elementTop=g.element.offset().top;var f=g.getHeight();if(g.elementTop+f<e||g.elementTop>e+d){return}g.proxyTransition(e)},bindHandlers:function(){var e=this;a(window).bind("scroll",function(){e.render()}).resize(function(){e.render()})}};d=c.height();c.resize(function(){d=c.height()});if(typeof Object.create!=="function"){Object.create=function(f){function e(){}e.prototype=f;return new e()}}a.fn.parallax=function(e){return this.each(function(){var f=Object.create(b);f.__init(this,e)})};a.fn.parallax.DEFAULTS={speed:0.5,xBGPos:"50%",yBGPos:"50%",outerHeight:true,transitionType:"vertical"}})(jQuery);