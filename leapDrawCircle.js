var controllerOptions = {};
var i = 0;
var x = window.innerWidth/2;
var y = window.innerHeight/2;
var r = 25;
var z;
var rawXMax = 200;
var rawXMin = -100;
var rawYMax = 100;
var rawYMin = -100;

function HandleFrame(frame){
	if(frame.hands.length == 1){
		var hand = frame.hands[0];
		var pointables = frame.pointables;
		HandleHand(hand,pointables);
	}
}


function HandleHand(hand,pointables){
	//console.log(hand);
	var fingers = hand.fingers;
	HandleFinger(fingers,pointables);

}

function HandleFinger(fingers,pointables){
	//console.log(fingers);
	for (j = 0; j < 5; j++) {
		if(fingers[j].type == 1){
			console.log(fingers[j]);
			var tip = pointables[1].tipPosition;
			x = tip[0];
			y = tip[1];
			z = tip[2];
			if (x < rawXMin){
				rawXMin = x;
			}
			if (x > rawXMax){
				rawXMax = x;
			}
			if (y < rawYMin){
				rawYMin = y;
			}
			if (y > rawYMax){
				rawYMax = y;
			}
			

			scalex = (((x + window.innerWidth) - rawXMin) / (rawXMax - rawXMin) ) * (window.innerWidth);
			scaley = (((-y + window.innerHeight) - rawYMin) / (rawYMax - rawXMin) ) * (window.innerHeight);
			circle(x + window.innerWidth,-y + window.innerHeight,r);
			console.log(scalex);
			console.log(scaley);

		}
	}
}

Leap.loop(controllerOptions, function(frame)
{	
	clear();
	//console.log(i)
	//i++;
	//var ranx = Math.floor(Math.random() * 2) + -2;
	//var rany = Math.floor(Math.random() * 2) + -2;
	//circle(x + ranx,y + rany,r);
	
	HandleFrame(frame);
}
);