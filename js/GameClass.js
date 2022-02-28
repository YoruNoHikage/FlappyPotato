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

	let _firstTime = true;
	let _gameOver = false;

	const spacebar = new Image();
	spacebar.src = "img/spacebar.png";

	const gradientSky = context.createLinearGradient(0, 0, 0, _canvasHeight);
    gradientSky.addColorStop(0, "#0099ff");
    gradientSky.addColorStop(1, "white");

	//instance of this to enable the callback function (it stinks)
	var _self = this;

	//-Main Loop
	this.gameLoop = function()
	{
		// updates
		if (!_gameOver && !_firstTime) {
			//for each obstacle
			for(var i = 0; i < _obstacles.length; i++)
			{
				_obstacles[i].moveForward(_speedX);
				
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
		}

		context.fillStyle = gradientSky;
		context.fillRect(0, 0, _canvasWidth, _canvasHeight);

		//for each obstacle
		for(var i = 0; i < _obstacles.length; i++)
		{
			_obstacles[i].draw(_context);
		}

		_potato.draw(_context);

		//score display
		if (!_firstTime || !_gameOver) {
		_score.draw(_context, _canvasWidth, _canvasHeight);
		}

		if (_firstTime || _gameOver) {
			context.save();

			context.fillStyle = "#ffde59";
			context.textAlign = "center";
			context.font = "200px Bubblegum Sans";
			context.lineWidth = 8;
			context.shadowColor = "#222";
			context.shadowOffsetX = 5;
			context.shadowOffsetY = 5;
			context.strokeText("Flappy Potato", canvasWidth / 2, _canvasHeight * 0.2, canvasWidth);
			context.fillText("Flappy Potato", canvasWidth / 2, _canvasHeight * 0.2, canvasWidth);

			const spaceBarWidth = 300;
			const spaceBarHeight = 57;
			context.drawImage(spacebar, canvasWidth / 2 - spaceBarWidth / 2, canvasHeight * 0.75, spaceBarWidth, spaceBarHeight);

			if (_gameOver) {
				context.fillStyle = "#fff";
				context.textAlign = "center";
				context.font = "300px Bubblegum Sans";
				context.strokeText(_score.get(), canvasWidth / 2, canvasHeight / 2 + 100);
				context.fillText(_score.get(), canvasWidth / 2, canvasHeight / 2 + 100);
			}

			context.restore();
		}

		window.requestAnimFrame(_self.gameLoop);
	}

	//when the player die
	this.gameOver = function()
	{
		_gameOver = true;
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

	this.start = function()
	{
		_gameOver = false;
		_firstTime = false;
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

	this.isStarted = function() {
		return !_gameOver && !_firstTime;
	}
}