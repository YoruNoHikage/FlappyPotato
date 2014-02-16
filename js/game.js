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

window.onload = function() {
	
	var canvasWidth = 640;
	var canvasHeight = 480;
	
	var keyRepetition = false;
	var speedX = 2;
	var holeLength = 190;
	
	var scene = new Kinetic.Stage({
	  container: "kinetic",
	  width: canvasWidth,
	  height: canvasHeight
	});
	
	var layer = new Kinetic.Layer();
	
	var potato = new Potato();
	potato.addToLayer(layer);
	
	var obstacles = new Array();
	
	//-Main Loop
	gameLoop = function()
	{
		potato.reevaluatePosition();
		potato.draw(layer);
		
		for(var i = 0; i < obstacles.length; i++)
		{
			
			obstacles[i].moveForward(speedX);
			obstacles[i].draw(layer);
			
			//intersections (game over)
			if(potato.intersect(obstacles[i]))
				alert("perdu");
		}
		if(obstacles.length > 0)
		{
			//obstacles out from layer ?
			if(obstacles[0].outFromLayer())
			{
				//remove top & bot obstacles
				obstacles.shift();
				obstacles.shift();
			}
		}
		
		window.requestAnimFrame(gameLoop);
	};
	
	scene.add(layer);
	gameLoop();
	
	//-create obstacles every x seconds-------------------------
	function createObstacle()
	{
		heightObstacle = Math.floor(Math.random()*(480-holeLength))
		//top obstacle
		newObstacle = new Obstacle(0, heightObstacle);
		newObstacle.addToLayer(layer);
		obstacles.push(newObstacle);
		//bot obstacle
		newObstacle2 = new Obstacle(heightObstacle + holeLength, 480 - (heightObstacle + holeLength));
		newObstacle2.addToLayer(layer);
		obstacles.push(newObstacle2);
	}
	window.setInterval(createObstacle, 2000);
	
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