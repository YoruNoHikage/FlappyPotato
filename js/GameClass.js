var Game = function(canvasWidth, canvasHeight, context, canvas)
{
	//context carac
	var _canvasWidth = canvasWidth;
	var _canvasHeight = canvasHeight;
	var _context = context;
	var _canvas = canvas;

	var _potato = new Potato(canvasWidth, canvasHeight);
	var _obstacles = new Array();

	var _speedX = 2;
	var _holeLength = 190;

	//instance of this to enable the callback function (it stinks)
	var _self = this;

	//-Main Loop
	this.gameLoop = function()
	{
		//context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		//weird function to clear context ; previous not working 
		_canvas.width = _canvas.width;

		//reposition of the potato & drawing
		_potato.reevaluatePosition();
		_potato.draw(_context);

		//for each obstacle
		for(var i = 0; i < _obstacles.length; i++)
		{
			_obstacles[i].moveForward(_speedX);
			_obstacles[i].draw(_context);
			
			//intersections (game over)
			if(_potato.intersect(_obstacles[i]))
				_self.reloadGame();
		}
		
		if(_obstacles.length > 0)
		{
			//obstacles out from layer ?
			if(_obstacles[0].outFromLayer())
			{
				//remove top & bot obstacles
				_obstacles.shift();
			}
		}
		window.requestAnimFrame(_self.gameLoop);
	}
	
	//restart game
	this.reloadGame = function()
	{
		_potato.reload();
		_obstacles = new Array();
	}

	//create obstacles every x seconds
	this.createObstacle = function()
	{
		heightObstacle = Math.floor(Math.random()*(_canvasHeight - _holeLength))
		//top obstacle
		newObstacle = new Obstacle(0, heightObstacle, _canvasWidth, _canvasHeight);
		_obstacles.push(newObstacle);
		//bot obstacle
		newObstacle2 = new Obstacle(heightObstacle + _holeLength, _canvasHeight - (heightObstacle + _holeLength), _canvasWidth, _canvasHeight);
		_obstacles.push(newObstacle2);
	}

	//user action
	this.arrowUp = function()
	{
		_potato.addAcceleration(-10);
	}
}