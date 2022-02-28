var Score = function()
{
	var _score = 0;

	this.draw = function(context, canvasWidth, canvasHeight)
	{
		context.save();

		//score display
		context.textAlign = "right";
		context.fillStyle = "#fff";
		context.textAlign = "right";
		context.font = "72pt Bubblegum Sans, cursive";
		context.lineWidth = 8;
		context.strokeText(_score / 2, canvasWidth - 50, canvasHeight * 0.1);
		context.fillText(_score / 2, canvasWidth - 50, canvasHeight * 0.1);

		context.shadowColor = "transparent";

		context.restore();
	}

	this.setScore = function(newScore)
	{
		_score = newScore;
	}

	this.increment = function()
	{
		_score++;
	}

	this.get = function ()
	{
		return _score / 2;
	}
}