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
	for (i = 3 ; i >= 0 ; i--){
		for (j = 0 ; j < 5 ; j++){
		HandleBone(fingers[j].bones[i],i);
		}	
	}	
	//HandleFinger(fingers,pointables);

}

function HandleFinger(fingers,pointables){
	//console.log(fingers);
	for (j = 0; j < 5; j++) {
		
			//console.log(fingers[j]);
			var tip = pointables[j].tipPosition;
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
			//circle(x + window.innerWidth/2,-y + window.innerHeight,r);
			//console.log(scalex);
			//console.log(scaley);
			var bones = fingers[j].bones;
			HandleBone(bones);
	}
}

function HandleBone(bones,i){
	//for (i = 0; i < 4 ; i++){
		//console.log(bones[i]);
		var x = bones.nextJoint[0];
		var y = bones.nextJoint[1];
		var z = bones.nextJoint[2];
		var a = bones.prevJoint[0];
		var b = bones.prevJoint[1];
		var c = bones.prevJoint[2];
		
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
			//circle(x + window.innerWidth/2,-y + window.innerHeight,r);
			[a,b,x,y] = transformCoordinates(a,b,x,y);
			if (i == 0){
				stroke(100);
				strokeWeight(4);
			}else if (i == 1){
				stroke(75);
				strokeWeight(3);
			}else if (i == 2){
				stroke(50);
				strokeWeight(2);
			}else if (i == 3){
				stroke(25);
				strokeWeight(1);
			}
			line(a,b,x,y);
	//}	
}

function transformCoordinates(a,b,x,y){
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
	x = x + window.innerWidth/2;
	a = a + window.innerWidth/2;
	y = -y + window.innerHeight/2;
	b = -b + window.innerHeight/2;
	return [a,b,x,y];
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