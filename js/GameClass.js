var Game = function(canvasWidth, canvasHeight, context, canvas)
{
	//context carac
	var _canvasWidth = canvasWidth;
	var _canvasHeight = canvasHeight;
	var _context = context;
	var _canvas = canvas;

	var _potato = new Potato(canvasWidth, canvasHeight);
	window.setInterval(_potato.nextSprite, 50);
	var _score = new Score();

	var _obstacles = new Array();
	var _speedX = 10;
	var _holeLength = 420;
	var _obstaclesInWindow = 3;

	const gradientSky = context.createLinearGradient(0, 0, 0, _canvasHeight);
    gradientSky.addColorStop(0, "#0099ff");
    gradientSky.addColorStop(1, "white");

	//instance of this to enable the callback function (it stinks)
	var _self = this;

	//-Main Loop
	this.gameLoop = function()
	{
		context.fillStyle = gradientSky;
		context.fillRect(0, 0, _canvasWidth, _canvasHeight);

		//for each obstacle
		for(var i = 0; i < _obstacles.length; i++)
		{
			_obstacles[i].moveForward(_speedX);
			_obstacles[i].draw(_context);
			
			if(!_potato.hasBeenHit() && _obstacles[i].lookIfPassed(_potato.getHitbox()) && !_obstacles[i].isPassed())
			{
				_score.increment();
				_obstacles[i].pass();
			}

			//intersections (game over)
			if(_potato.intersect(_obstacles[i]) || _potato.getHitbox().getY() + _potato.getHitbox().getHeight() >= canvasHeight) {
				_potato.hit();
			}
		}

		//reposition of the potato & drawing
		_potato.reevaluatePosition();
		_potato.draw(_context);

		//score display
		_score.draw(_context, _canvasWidth * 0.9, _canvasHeight * 0.1);

		//if the potato has fallen
		if(_potato.isDead())
			_self.gameOver();			

		if(_obstacles.length > 0)
		{
			//if the last obstacle reach a x-position, we launch a new one
			if(_obstacles[_obstacles.length - 1].distanceFromOrigin() > _canvasWidth / _obstaclesInWindow)
				_self.createObstacle();

			//obstacles out from layer ?
			if(_obstacles[0].outFromLayer())
			{
				//remove top & bot obstacles
				_obstacles.shift();
			}
		}
		else
			_self.createObstacle();

		window.requestAnimFrame(_self.gameLoop);
	}

	//when the player die
	this.gameOver = function()
	{
		_score.flush();
		_self.reloadGame();
	}
	
	//restart game
	this.reloadGame = function()
	{
		_potato.reload();
		_obstacles = new Array();
		_score.setScore(0);
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
		_potato.flap();
	}

	this.everythingLoaded = function()
	{
		return _potato.imgLoaded(); 
	}
}