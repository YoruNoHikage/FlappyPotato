var Hitbox = function(x, y, width, height)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.setX = function(x)
	{
		this.x = x;
	}
	
	this.setY = function(y)
	{
		this.y = y;
	}
	
	this.intersect = function(otherBox)
	{
		if((this.x <= otherBox.x && (otherBox.x - this.x) < this.width) || (this.x > otherBox.x && (this.x - otherBox.x) < otherBox.width))
		{
			if((this.y <= otherBox.y && (otherBox.y - this.y) < this.height) || (this.y > otherBox.y && (this.y - otherBox.y) < otherBox.height))
				return true;
			else
				return false;
		}
		else
			return false;
	}
}