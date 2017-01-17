(function($) {  
	$.fn.hueristics = function(options){
		var settings = $.extend({
			property: 'background-color',
			hue: 360,
			saturation: 100,
			lightness: 50,
			alpha: 1,
			moveVal: 'hue',
			maxVal: 360,
			minVal: 0,
			speed: 25,
			step: 1,
			reverse:false
		}, options ),
		config = {
			'dir' : 'd',
			'el' : $(this)
		},
		startFade = function(startColor,endColor){
			
		},
		rgba2Hsla = function(r, g, b, a){
		    r /= 255, g /= 255, b /= 255, a /= 1;
		    var max = Math.max(r, g, b), min = Math.min(r, g, b);
		    var h, s, l = (max + min) / 2;

		    if(max == min){
		        h = s = 0; // achromatic
		    }
		    else{
		        var d = max - min;
		        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		        switch(max){
		            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
		            case g: h = (b - r) / d + 2; break;
		            case b: h = (r - g) / d + 4; break;
		        }
		        h /= 6;
		    }

		    return [h, s, l, a];
		},
		doHue = function(){
			setInterval(function(){
	            config.dir = (settings[settings['moveVal']]>settings.maxVal) ? 'd' : (settings[settings['moveVal']]<settings.minVal) ? 'u' : config.dir;
	            
	            if(settings.reverse){
	            	settings[settings['moveVal']] = (config.dir=='u') ? settings[settings['moveVal']]-=settings.step : settings[settings['moveVal']]+=settings.step;
	            }
	            else{
	            	settings[settings['moveVal']] = (config.dir=='u') ? settings[settings['moveVal']]+=settings.step : settings[settings['moveVal']]-=settings.step;
	            }
	            config.el.css(settings.property,'hsla('+settings.hue+','+settings.saturation+'%,'+settings.lightness+'%,'+settings.alpha+')');
	            
	        },settings.speed)
		};
		config.el.css(settings.property,'hsla('+settings.hue+','+settings.saturation+'%,'+settings.lightness+'%,'+settings.alpha+')');
		doHue();
		/*
		if (window.addEventListener) {
			window.addEventListener('load',	doHue, false);
		}
		else if (window.attachEvent) {
			window.attachEvent('onload', doHue);
		}
		*/
	}
})(jQuery);