window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       || // La forme standardisée
           window.webkitRequestAnimationFrame || // Pour Chrome et Safari
           window.mozRequestAnimationFrame    || // Pour Firefox
           window.oRequestAnimationFrame      || // Pour Opera
           window.msRequestAnimationFrame     || // Pour Internet Explorer
           function(callback){                   // Pour les élèves du dernier rang
               window.setTimeout(callback, 1000 / 60);
           };
})();

window.onload = function() {
	
	var canvasWidth = 640;
	var canvasHeight = 480;
	
	var keyRepetition = false;
	var speedX = 2;
	
	var scene = new Kinetic.Stage({
	  container: "kinetic",
	  width: canvasWidth,
	  height: canvasHeight
	});
	
	var layer = new Kinetic.Layer();
	
	var potato = new Potato();
	potato.addToLayer(layer);
	
	var obstacle = new Obstacle(0, 100);
	obstacle.addToLayer(layer);
	
	//-Main Loop
	gameLoop = function()
	{
		potato.reevaluatePosition();
		potato.draw(layer);
		
		obstacle.moveForward(speedX);
		obstacle.draw(layer);
		
		window.requestAnimFrame(gameLoop);
	};
	
	scene.add(layer);
	gameLoop();
	
	//-Keyboard Management-------------------------------------
	function keyDown(event)
	{
		var key = window.event ? event.keyCode : event.which;
		if(key == 32 && !keyRepetition)
		{
			potato.addAcceleration(-10);
			keyRepetition = true;
		}
	}
	document.body.onkeydown = keyDown;
	
	function keyUp(event)
	{
		var key = window.event ? event.keyCode : event.which;
		if(key == 32)
			keyRepetition = false;
	}
	document.body.onkeyup = keyUp;
	//----------------------------------------------------------
};