var Hitbox = function(x, y, width, height)
{
	var _x = x;
	var _y = y;
	var _width = width;
	var _height = height;
	
	this.setX = function(x)
	{
		_x = x;
	}

	this.getX = function()
	{
		return _x;
	}

	this.getY = function()
	{
		return _y;
	}
	
	this.setY = function(y)
	{
		_y = y;
	}

	this.getWidth = function()
	{
		return _width;
	}

	this.getHeight = function()
	{
		return _height;
	}
	
	this.intersect = function(otherBox)
	{
		if((_x <= otherBox.getX() && (otherBox.getX() - _x) < _width) || (_x > otherBox.getX() && (_x - otherBox.getX()) < otherBox.getWidth()))
		{
			if((_y <= otherBox.getY() && (otherBox.getY() - _y) < _height) || (_y > otherBox.getY() && (_y - otherBox.getY()) < otherBox.getHeight()))
				return true;
			else
				return false;
		}
		else
			return false;
	}

	this.draw = function(context, color) {
		context.fillStyle = color;
    	context.fillRect(_x, _y, _width, _height);
	}
}