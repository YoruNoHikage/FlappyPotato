var Obstacle = function(y, height)
{
	this.sprite = new Kinetic.Rect({
        width: 50,
		height: height,
		x: 480,
        y: y,
        radius: 20,
        fill: 'green',
        listening: false
    });
	this.y = y;
	this.x = 480;
	
	this.moveForward = function(speedX)
	{
		this.x -= speedX;
		this.sprite.move({x:-speedX, y:0});
	}
	
	this.draw = function(layer)
	{
		layer.draw(this.sprite);
	}
	
	this.addToLayer = function(layer)
	{
		layer.add(this.sprite);
	}
}