var Obstacle = function(y, height, canvasWidth, canvasHeight)
{
	//obstacles carac
    var _x = canvasWidth;
    var _y = y;
    var _width = 150;
    var _height = height;
	var _hitbox = new Hitbox(_x, _y, _width, _height);
	var _passed = false;

	var _sprite = new Image();
	_sprite.src = "img/spritesheet_econome.png";
	_sprite.height = '568px';
	_sprite.width = '150px';

	const spriteH = 568;

	const sizes = [
		{x: 0, y: 0, w: 150, h: 150}, // sharp bit height 
		{x: 0, y: 160, w: 150, h: 1}, // middle bit height 
		{x: 0, y: spriteH - 120, w: 150, h: 110}, // last bit height 
	];

	const sharpBitSize = sizes[0].h;
	const middleBitSize = sizes[1].h;
	const lastBitSize = sizes[2].h;

	const repeatedBitSize = _height - lastBitSize;

	//movement function
	this.moveForward = function(speedX)
	{
		_x -= speedX;
		_hitbox.setX(_x);
	}
	
	//draw the obstacle
	this.draw = function(context)
	{
		// hitbox debug
		// _hitbox.draw(context, 'green');

		if (y === 0) {
			context.save();
			context.rotate(Math.PI);

			// sharp bit
			context.drawImage(_sprite, sizes[0].x, sizes[0].y, sizes[0].w, sizes[0].h, - _x, - _height, - _width, sharpBitSize);

			// middle bit
			if (repeatedBitSize > 0) {
				context.drawImage(_sprite, sizes[1].x, sizes[1].y, sizes[1].w, sizes[1].h, - _x, 0, - _width, -_height + sharpBitSize);

				// last bit
				if (repeatedBitSize > lastBitSize * 2) {
					context.drawImage(_sprite, sizes[2].x, sizes[2].y, sizes[2].w, sizes[2].h, - _x, 0, - _width, - lastBitSize);
				}
			}

			context.restore();
		} else {
			// sharp bit
			context.drawImage(_sprite, sizes[0].x, sizes[0].y, sizes[0].w, sizes[0].h, _x, _y, _width, sharpBitSize);

			// middle bit
			if (repeatedBitSize > 0) {
				context.drawImage(_sprite, sizes[1].x, sizes[1].y, sizes[1].w, sizes[1].h, _x, _y + sharpBitSize, _width, _height - sharpBitSize);

				// last bit
				if (repeatedBitSize > lastBitSize * 2) {
					context.drawImage(_sprite, sizes[2].x, sizes[2].y, sizes[2].w, sizes[2].h, _x, canvasHeight - lastBitSize, _width, lastBitSize);
				}
			}
		}
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
		return canvasWidth - _x;
	}
}