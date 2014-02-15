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
		if(this.sprite.y() + this.sprite.height() >= 480)
		{
			this.sprite.y(480 - this.sprite.height());
			this.speedY = 0;
		}
		else
		{
			this.speedY += 0.5;
			this.sprite.move({x:0, y:this.speedY});
		}
	}
}
