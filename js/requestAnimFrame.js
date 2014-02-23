window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       || // La forme standardisee
    	window.webkitRequestAnimationFrame || // Pour Chrome et Safari
      	window.mozRequestAnimationFrame    || // Pour Firefox
       	window.oRequestAnimationFrame      || // Pour Opera
       	window.msRequestAnimationFrame     || // Pour Internet Explorer
       	function(callback){                   // Pour les eles du dernier rang
          	window.setTimeout(callback, 1000 / 60);
       	};
})();