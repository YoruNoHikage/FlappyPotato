var Obstacle = function(y, height)
{
	this.sprite = new Kinetic.Rect({
        width: 50,
		height: height,
		x: 640,
        y: y,
        radius: 20,
        fill: 'green',
        listening: false
    });
	this.hitbox = new Hitbox(640, y, 50, height);
	
	this.moveForward = function(speedX)
	{
		this.x -= speedX;
		this.sprite.move({x:-speedX, y:0});
		this.hitbox.setX(this.sprite.x());
	}
	
	this.draw = function(layer)
	{
		layer.draw(this.sprite);
	}
	
	this.addToLayer = function(layer)
	{
		layer.add(this.sprite);
	}
	
	this.getHitbox = function()
	{
		return this.hitbox;
	}
	
	this.outFromLayer = function()
	{
		if(this.x + this.sprite.width() < 0)
			return true;
		else
			return false;
	}
}