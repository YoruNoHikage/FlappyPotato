var Obstacle = function(y, height, canvasWidth, canvasHeight)
{
	//context carac
	var _canvasWidth = canvasWidth;
	var _canvasHeight = canvasHeight;
	//obstacles carac
    var _x = _canvasWidth;
    var _y = y;
    var _width = 50;
    var _height = height;
	var _hitbox = new Hitbox(_x, _y, _width, _height);
	var _passed = false;
	
	//movement function
	this.moveForward = function(speedX)
	{
		_x -= speedX;
		_hitbox.setX(_x);
	}
	
	//draw the obstacle
	this.draw = function(context)
	{
		context.fillStyle = "green";
		context.fillRect(_x, _y, _width, _height);
	}
	
	//if you want to give this hitbox to an intersect function
	this.getHitbox = function()
	{
		return _hitbox;
	}
	
	//detect if the potato get out of bounds
	this.outFromLayer = function()
	{
		if(_x + _width < 0)
			return true;
		else 
			return false;
	}

	this.isPassed = function()
	{
		return _passed;
	}

	this.pass = function()
	{
		_passed = true;
	}

	this.lookIfPassed = function(playerHitbox)
	{
		if(_hitbox.getX() < playerHitbox.getX())
			return true;
		else
			return false;
	}

	//return distance from the right border to trigger a new obstacle
	this.distanceFromOrigin = function()
	{
		return _canvasWidth - _x;
	}
}