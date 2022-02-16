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
	//state
	var _hit = false;
	var _rebound = false;
	var _dead = false;

	//related to the potato's sprite
	var _spriteSheet = new Image();
    _spriteSheet.src = "img/spritesheet.png";
	var _imgLoaded = false;
	_spriteSheet.onload = function(){_imgLoaded = true;};

	//some sprite have different size
	var anim1Width = 267;
	var anim1Height = 297;
	var anim2Width = 120;
	var anim2Height = 121;
	var anim3Width = 120;
	var anim3Height = 121;
	//each frame as an x/y-position (0, 267, 267*2, etc)
	var _spriteX = Array();
	var _spriteY = Array();
	for(var i = 0; i < 9; i++)
	{
		_spriteX[i] = i * anim1Width;
		_spriteY[i] = 0;
	}
	for(var i = 0; i < 10; i++)
	{
		_spriteX[9+i] = i * anim2Width;
		_spriteY[9+i] = anim1Height;
	}
	for(var i = 0; i < 7; i++)
	{
		_spriteX[19+i] = i * anim3Width;
		_spriteY[19+i] = anim1Height + anim2Height;
	}
	var _currentSprite = 0;

	var _self = this;

	//when you want to reset the game
	this.reload = function()
	{
		_x = 100;
		_y = 100;
		_speedY = 0;
		_self.fly();
	}
	
	this.draw = function(context)
	{
		//hitbox debug
 		//context.fillStyle = "yellow";
		//context.fillRect(_x, _y, _width, _height);
		//real potato (redimensionnee a l'arrache)
		if(!_hit)
			context.drawImage(_spriteSheet, _spriteX[_currentSprite], _spriteY[_currentSprite], anim1Width, anim1Height, _x - _width * 0.25, _y - _height * 0.5, _width * 1.5, _height * 2);
		else if(_hit && !_rebound)
			context.drawImage(_spriteSheet, _spriteX[_currentSprite], _spriteY[_currentSprite], anim2Width, anim2Height, _x, _y, _width, _height);
		else if(_rebound)
			context.drawImage(_spriteSheet, _spriteX[_currentSprite], _spriteY[_currentSprite], anim3Width, anim3Height, _x, _y, _width, _height);
	}
	
	//to simulate gravity
	this.addAcceleration = function(acc)
	{
		_speedY = acc;
	}

	this.flap = function()
	{
		if(!_hit && !_rebound)
		{
			_self.addAcceleration(-10);
			_self.changeCurrentSprite(0);
		}
			
	}

	this.rebound = function()
	{
		if(!_rebound)
		{
			_self.addAcceleration(-10);
			_rebound = true;
		}
	}
	
	//called before processing each frame
	this.reevaluatePosition = function()
	{
		if(_y + _height >= _canvasHeight)
		{
			if(!_rebound)
			{
				_y = _canvasHeight - _height - 1;
				_self.rebound();
			}
			else
			{
				_y = _canvasHeight - _height;
				_speedY = 0;
				_dead = true;
			}
		}
		else
		{
			_speedY += 0.7;
			_y += _speedY;
		}
		_hitbox.setY(_y);
	}

	this.hit = function()
	{
		_hit = true;
	}

	this.fly = function()
	{
		_hit = false;
		_rebound = false;
		_dead = false;
	}

	this.hasBeenHit = function()
	{
		return _hit;
	}

	this.isDead = function()
	{
		return _dead;
	}

	//return potato's hitbox
	this.getHitbox = function()
	{
		return _hitbox;
	}
	
	//take an hitbox and return true if the potato's intersect with it
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
		if(_currentSprite >= 9 && !_hit)
			_currentSprite = 8;
		else if(_currentSprite < 9 && _hit && !_rebound)
			_currentSprite = 9;
		else if(_currentSprite >= 19 && _hit && !_rebound)
			_currentSprite = 18;
		else if(_currentSprite < 19 && _rebound)
			_currentSprite = 19;
		else if(_currentSprite >= 26 && _rebound)
			_currentSprite = 25;
	}

	//typically when you type arrow_up, the animation is set to 0 to make flap the potato
	this.changeCurrentSprite = function(nextSprite)
	{
		if(nextSprite < 26 && nextSprite >= 0)
			_currentSprite = nextSprite;
	}
}