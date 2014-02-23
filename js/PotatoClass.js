var Potato = function(canvasWidth, canvasHeight)
{
	//context carac
	var _canvasWidth = canvasWidth;
	var _canvasHeight = canvasHeight;
    //the potato's attributes (position, size, cooking)
    var _x = 100;
    var _y = 100;
    var _width = 60;
    var _height = 40;
	var _speedY = 0;
	var _hitbox = new Hitbox(_x, _y, _width, _height);
	
	//when you want to reset the game
	this.reload = function()
	{
		_x = 100;
		_y = 100;
		_speedY = 0;
	}
	
	this.draw = function(context)
	{
		context.fillStyle = "gold";
		context.fillRect(_x, _y, _width, _height);
	}
	
	//to simulate gravity
	this.addAcceleration = function(acc)
	{
		_speedY = acc;
	}
	
	//called before processing each frame
	this.reevaluatePosition = function()
	{
		if(_y + _height >= _canvasHeight)
		{
			_y = _canvasHeight - _height;
			_speedY = 0;
		}
		else
		{
			_speedY += 0.5;
			_y += _speedY;
		}
		_hitbox.setY(_y);
	}
	
	this.getHitbox = function()
	{
		return _hitbox;
	}
	
	this.intersect = function(object)
	{
		return _hitbox.intersect(object.getHitbox());
	}
}