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

	//related to the potato's sprite
	var _spriteSheet = new Image();
    _spriteSheet.src = "img/spritesheet.png";
	var _imgLoaded = false;
	_spriteSheet.onload = function(){_imgLoaded = true; alert("patate chargée");};

	//each frame as an x-position (0, 267, 267*2, etc)
	var _spriteX = Array();
	for(var i = 0; i < 9; i++)
		_spriteX[i] = i * 267;
	var _currentSprite = 0;

	//when you want to reset the game
	this.reload = function()
	{
		_x = 100;
		_y = 100;
		_speedY = 0;
	}
	
	this.draw = function(context)
	{
		//hitbox debug
 		//context.fillStyle = "yellow";
		//context.fillRect(_x, _y, _width, _height);
		//real potato (redimensionnee a l'arrache)
		context.drawImage(_spriteSheet, _spriteX[_currentSprite], 0, 267, 297, _x - _width * 0.25, _y - _height * 0.5, _width * 1.5, _height * 2);
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
			_speedY += 0.7;
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

	//function used by GameClass to know if the sprite sheet is completely downloaded
	this.imgLoaded = function()
	{
		return _imgLoaded;
	}

	//used by a GameClass thread to animate the potato 
	this.nextSprite = function()
	{
		_currentSprite++;
		if(_currentSprite >= 9)
			_currentSprite = 8;
	}

	//typically when you type arrow_up, the animation is set to 0 to make flap the potato
	this.changeCurrentSprite = function(nextSprite)
	{
		if(nextSprite < 9 && nextSprite >= 0)
			_currentSprite = nextSprite;
	}
}