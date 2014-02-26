window.onload = function()
{
	var canvas  = document.querySelector('#canvas');
	var context = canvas.getContext('2d');
	var game = new Game(640, 480, context, canvas);
	
	function loop()
	{
		if(game.everythingLoaded())
		{
			game.gameLoop();
			//periodic obstacle creation
			window.setInterval(game.createObstacle, 1000);
		}
		else
			setTimeout(loop,100);
	}
	loop();
	
	//Keyboard Management-------------------------------------
	var keyRepetition = false;
	function keyDown(event)
	{
		var key = window.event ? event.keyCode : event.which;
		if(key == 32 && !keyRepetition)
		{
			game.arrowUp();
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