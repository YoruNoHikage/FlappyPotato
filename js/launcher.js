window.onload = function()
{
	var canvas  = document.querySelector('#canvas');
	var context = canvas.getContext('2d');
	var game = new Game(640, 480, context, canvas);
	game.gameLoop();
	
	//periodic obstacle creation
	window.setInterval(game.createObstacle, 2000);
	
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