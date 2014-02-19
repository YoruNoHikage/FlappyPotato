var Potato = function()
{
	this.sprite = new Kinetic.Circle({
        x: 100,
        y: 100,
        radius: 20,
        scaleX: 1.5,
        fill: 'yellow',
		stroke: 'black',
        strokeWidth: 2,
        strokeScaleEnabled: false,
        listening: false
    });
	this.speedY = 0;
	this.hitbox = new Hitbox(100-this.sprite.width()/2, 100-this.sprite.height()/2, this.sprite.width(), this.sprite.height());
	
	this.reload = function()
	{
		this.sprite.x(100);
		this.sprite.y(100);
		this.speedY = 0;
		this.hitbox = new Hitbox(100-this.sprite.width()/2, 100-this.sprite.height()/2, this.sprite.width(), this.sprite.height());
	}
	
	this.addToLayer = function(layer)
	{
		layer.add(this.sprite);
	}
	
	this.draw = function(layer)
	{
		layer.draw(this.sprite);
	}
	
	this.addAcceleration = function(acc)
	{
		this.speedY = acc;
	}
	
	this.reevaluatePosition = function()
	{
		//-------------code en dur-------------------
		if(this.sprite.y() + this.sprite.height()/2 >= 480)
		{
			this.sprite.y(480 - this.sprite.height()/2);
			this.speedY = 0;
		}
		else
		{
			this.speedY += 0.5;
			this.sprite.move({x:0, y:this.speedY});
		}
		this.hitbox.setY(this.sprite.y()-this.sprite.width()/2);
	}
	
	this.getHitbox = function()
	{
		return this.hitbox;
	}
	
	this.intersect = function(object)
	{
		return this.hitbox.intersect(object.getHitbox());
	}
}
