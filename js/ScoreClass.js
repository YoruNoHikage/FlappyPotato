var Score = function()
{
	var _score = 0;

	this.draw = function(context, posX, posY)
	{
		//score display
		context.font = "bold 32pt Calibri,Geneva,Arial";
		context.fillStyle = "#000";
		context.fillText(_score / 2, posX, posY);
	}

	this.setScore = function(newScore)
	{
		_score = newScore;
	}

	this.increment = function()
	{
		_score++;
	}

	this.flush = function()
	{
		var xhr = null;
 
	    if (window.XMLHttpRequest)
	        xhr = new XMLHttpRequest();
	    else if (window.ActiveXObject) 
	        xhr = new ActiveXObject("Microsoft.XMLHTTP");

	    //we'll look if the score can be displayed in the best scores file
	    xhr.open("POST", "http://localhost/flyingpotato/ranking.xml", false);
	    xhr.send("score=" + _score);
	    var xmlResponse = xhr.responseXML;
	    var players = xmlResponse.querySelectorAll("player");
	    var askName = false;//if the score is among the best, we'll ask the player his name and write his score

	    if(players.length < 5)
	    	askName = true;

	    //for each player of the ranking file
	    for(var i = 0 ; i < players.length ; i++)
	    {   	
	    	//player score
	    	var playerAttributes = players[i].attributes;
	    	var score = 0;
			for(var j = 0; j < playerAttributes.length; j++)
	    	{
	    		if(playerAttributes[j].name == "score")
	    			var score = playerAttributes[j].value;
	    	}

	    	if(_score / 2 > parseInt(score))
	    		askName = true;
	    }

	    if(askName)
	    {
	    	var name = prompt("Congrats ! Tell us you name to write it in the great potato hall of fame", "Patate Volante");
	    	xhr.open("POST", "http://localhost/flyingpotato/ranking.php", false);
	    	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	    	xhr.send("score=" + (_score / 2) + "&name=" + name);
	    }

	    xhr.open("POST", "http://localhost/flyingpotato/ranking.xml", false);
	    xhr.send("score=" + _score);
	    var xmlResponse = xhr.responseXML;
	    var players = xmlResponse.querySelectorAll("player");

	    //for each player of the ranking file
	    textToDisplay = "";
	    for(var i = 0 ; i < players.length ; i++)
	    {
	    	//player rank
	    	var rank = (i + 1);
	    	
	    	//player score
	    	var playerAttributes = players[i].attributes;
	    	var score = 0;
			for(var j = 0; j < playerAttributes.length; j++)
	    	{
	    		if(playerAttributes[j].name == "score")
	    			var score = playerAttributes[j].value;
	    	}

	    	if(_score > parseInt(score))
	    		askName = true;

	    	//player name
	    	var playerInfo = players[i].childNodes;
	    	var name = "";
	    	for(var j = 0 ; j < playerInfo.length ; j++)
	    		name += playerInfo[j].data;

	    	textToDisplay += (rank + ". " + name + " scored " + score + "\n");
	    }
	    alert(textToDisplay);

	}
}