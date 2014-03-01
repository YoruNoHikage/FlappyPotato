<?php
	//we load the xml document
	$documentName = "ranking.xml";
	$dom = new DomDocument();
	$dom->load($documentName);

	//get by POST the values passed by javascript
	$name = $_POST["name"];
	$score = intval($_POST["score"]);
	
	//to be sure to write ONCE the score
	$scoreWritten = false;

	//we create the new node that we'll probably put in the file
	$newScore = $dom->createElement("player");
	$newScore->setAttribute("score", $score);
	$newScore->appendChild($dom->createTextNode($name));

	//we get all the players stored in the file
	$players = $dom->getElementsByTagName('player');
	$ranking = $dom->getElementsByTagName('ranking')->item(0);
  	foreach($players as $player)
    {
    	if ($player->hasAttribute("score"))
    	{
    		$scoreRanked = intval($player->getAttribute("score"));
    		//if the new score exceed the one stored in the file
    		if($score > $scoreRanked && !$scoreWritten)
    		{
    			$ranking->insertBefore($newScore, $player);
    			$scoreWritten = true;
    		}
    	}
    }
    //if there si too much scores in the file
    if($players->length > 5)
    {
    	for($i = 0; $i < $players->length - 5; $i++)
    		$ranking->removeChild($players->item(5 + $i));
    }
    //else if there still some space in the file
    elseif($players->length < 5 && !$scoreWritten)
    	$ranking->appendChild($newScore);

   	$dom->save($documentName);
?>