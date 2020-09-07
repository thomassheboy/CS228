var controllerOptions = {};
var i = 0;
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var r = 25;

function HandleFrame(frame){
	if(frame.hands.length == 1){
		var hand = frame.hands[0];
		HandleHand(hand);
	}
}


function HandleHand(hand){
	//console.log(hand);
	var fingers = hand.fingers;
	HandleFinger(fingers);

}

function HandleFinger(fingers){
	//console.log(fingers);
	for (j = 0; j < 5; j++) {
		if(fingers[j].type == 1){
			//console.log(fingers[j]);
			var pointables = fingers[j].pointable;
		}
	}
}

function HandlePointables(pointables){
	var tipPosition = pointables.tipPosition;
	var x = tipPosition[0];
	var y = tipPosition[1];
	var z = tipPosition[2];
	console.log(x);
}

Leap.loop(controllerOptions, function(frame)
{	
	//clear();
	//console.log(i)
	//i++;
	//var ranx = Math.floor(Math.random() * 2) + -2;
	//var rany = Math.floor(Math.random() * 2) + -2;
	//circle(x + ranx,y + rany,r);
	
	HandleFrame(frame);
}
);