nj.config.printThreshold = 1000;
var numSamples = 2;
var framesOfData = nj.zeros([5,4,6,numSamples]);
var currentSample = 0;
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
var previousNumHands = 0;
var currentNumHands = 0;

function HandleFrame(frame){
	if(frame.hands.length >= 1){
		var hand = frame.hands[0];
		var pointables = frame.pointables;
		var box = frame.interactionBox;
		
		HandleHand(hand,pointables, box);
	}
}


function HandleHand(hand,pointables, InteractionBox){
	//console.log(hand);
	var fingers = hand.fingers;
	for (i = 3 ; i >= 0 ; i--){
		for (j = 0 ; j < 5 ; j++){
		HandleBone(fingers[j].bones[i],i,j, InteractionBox);
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
			HandleBone(bones,j);
	}
}

function HandleBone(bones,i,j, InteractionBox){
	//for (i = 0; i < 4 ; i++){
		//console.log(bones[i]);
		var normalizedNextJoint = InteractionBox.normalizePoint(bones.nextJoint, true);
		var normalizedPrevJoint = InteractionBox.normalizePoint(bones.prevJoint, true);
		//console.log(normalizedNextJoint[1]);
		//console.log(normalizedPrevJoint[1]);
		var x = normalizedNextJoint[0];
		var y = normalizedNextJoint[1];
		var z = normalizedNextJoint[2];
		var a = normalizedPrevJoint[0];
		var b = normalizedPrevJoint[1]; 
		var c = normalizedPrevJoint[2];
		
		framesOfData.set(j,i,0,currentSample,a);
		framesOfData.set(j,i,1,currentSample,b);
		framesOfData.set(j,i,2,currentSample,c);
		framesOfData.set(j,i,3,currentSample,x);
		framesOfData.set(j,i,4,currentSample,y);
		framesOfData.set(j,i,5,currentSample,z);
		
		var canvasX = window.innerWidth * normalizedNextJoint[0];
		var canvasY = window.innerHeight * (1-normalizedNextJoint[1]);
		var canvasA = window.innerWidth * normalizedPrevJoint[0];
		var canvasB = window.innerHeight * (1-normalizedPrevJoint[1]);
		//console.log(canvasX)
		//console.log(canvasY)
		//console.log(canvasA)
		//console.log(canvasB)
		
		
			c = c/2;
			z = z/2;
			var sum = x + y + z + a + b + c;
			//oneFrameOfData.set(j,i,0,a);
			//oneFrameOfData.set(j,i,1,b);
			//oneFrameOfData.set(j,i,2,c);
			//oneFrameOfData.set(j,i,3,x);
			//oneFrameOfData.set(j,i,4,y);
			//oneFrameOfData.set(j,i,5,z);
			//console.log(oneFrameOfData.toString())
			
			if(currentNumHands == 1){
				if (i == 0){ //Green
					stroke(0,100,0);
					strokeWeight(20);
				}else if (i == 1){
					stroke(0,128,0);
					strokeWeight(15);
				}else if (i == 2){
					stroke(34,139,34);
					strokeWeight(10);
				}else if (i == 3){
					stroke(0,255,0);
					strokeWeight(5);
				}
			}else {
				if (i == 0){ //Red
					stroke(153,0,0);
					strokeWeight(20);
				}else if (i == 1){
					stroke(255,0,0);
					strokeWeight(15);
				}else if (i == 2){
					stroke(255,102,102);
					strokeWeight(10);
				}else if (i == 3){
					stroke(255,153,153);
					strokeWeight(5);
				}
			}
			line(canvasA,canvasB,canvasX,canvasY);
	//}	
}


function changeBackground(){
		if (previousNumHands == 2 && currentNumHands == 1){
			background('#222222');
			console.log( framesOfData.toString() );

		}
		if(currentNumHands == 2){
			currentSample++;
			if (currentSample == numSamples){
				currentSample = 0;
			}
			//console.log(currentSample)
		}	
}	

Leap.loop(controllerOptions, function(frame)
{	
	currentNumHands = frame.hands.length;
	clear();
	
	//console.log(i)
	//i++;
	//var ranx = Math.floor(Math.random() * 2) + -2;
	//var rany = Math.floor(Math.random() * 2) + -2;
	//circle(x + ranx,y + rany,r);
	
	changeBackground();
	HandleFrame(frame);
	previousNumHands = currentNumHands;
}
);