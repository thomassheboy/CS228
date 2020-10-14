nj.config.printThreshold = 10000;

var trainingCompleted = false;
const knnClassifier = ml5.KNNClassifier();

var numFeatures;
var numSamples = train2.shape[3];
var testingSampleIndex = 0;
var predictedClassLabels = nj.zeros(numSamples);
var controllerOptions = {};


var numSamples = 100;
var framesOfData = nj.zeros([5,4,6]);
var currentSample = 0;
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
var prediction = 0;
var numPredictions = 1;

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
		
		framesOfData.set(j,i,0,a);
		framesOfData.set(j,i,1,b);
		framesOfData.set(j,i,2,c);
		framesOfData.set(j,i,3,x);
		framesOfData.set(j,i,4,y);
		framesOfData.set(j,i,5,z);
		
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
			
			if(currentNumHands > 0){
				//console.log(framesOfData.toString())
				Test();
				if (i == 0){ //Grey
					stroke(169,169,169);
					strokeWeight(20);
				}else if (i == 1){
					stroke(128,128,128);
					strokeWeight(15);
				}else if (i == 2){
					stroke(105,105,105);
					strokeWeight(10);
				}else if (i == 3){
					stroke(0,0,0);
					strokeWeight(5);
				}
			}
			//else {
				//if (i == 0){ //Red
					//stroke(153,0,0);
					//strokeWeight(20);
				//}else if (i == 1){
					//stroke(255,0,0);
					//strokeWeight(15);
				//}else if (i == 2){
					//stroke(255,102,102);
					//strokeWeight(10);
				//}else if (i == 3){
					//stroke(255,153,153);
					//strokeWeight(5);
				//}
			//}
			line(canvasA,canvasB,canvasX,canvasY);
	//}	
}


function changeBackground(){
		if (previousNumHands == 2 && currentNumHands == 1){
			background('#222222');
			//console.log( framesOfData.toString() );

		}
		if(currentNumHands == 2){
			currentSample++;
			if (currentSample == numSamples){
				currentSample = 0;
			}
			//console.log(currentSample)
		}	
}	


function Train(){
	var tensor;
	var features;
	var tensor2;
	var features2;
	var tensor3;
	var features3;
	var tensor4;
	var features4;
	var tensor5;
	var features5;
	var tensor6;
	var features6;
	var tensor7;
	var features7;
	var tensor8;
	var features8;
	var tensor9;
	var features9;
	var tensor10;
	var features10;
	for(var i = 0; i < train4.shape[3] ; i++){
		tensor = train2.shape[3];
		features = train2.pick(null,null,null,i);
		features = features.reshape(120);
		features = features.tolist();
		
		tensor2 = train4.shape[3];
		features2 = train4.pick(null,null,null,i);
		features2 = features2.reshape(120);
		features2 = features2.tolist();
		
		tensor3 = train0.shape[3];
		features3 = train0.pick(null,null,null,i);
		features3 = features3.reshape(120);
		features3 = features3.tolist();
		
		tensor4 = train1.shape[3];
		features4 = train1.pick(null,null,null,i);
		features4 = features4.reshape(120);
		features4 = features4.tolist();
		
		tensor5 = train3.shape[3];
		features5 = train3.pick(null,null,null,i);
		features5 = features5.reshape(120);
		features5 = features5.tolist();
		
		tensor6 = train5.shape[3];
		features6 = train5.pick(null,null,null,i);
		features6 = features6.reshape(120);
		features6 = features6.tolist();
		
		tensor7 = train6.shape[3];
		features7 = train6.pick(null,null,null,i);
		features7 = features7.reshape(120);
		features7 = features7.tolist();
		
		tensor8 = train7.shape[3];
		features8 = train7.pick(null,null,null,i);
		features8 = features8.reshape(120);
		features8 = features8.tolist();
		
		tensor9 = train8.shape[3];
		features9 = train8.pick(null,null,null,i);
		features9 = features9.reshape(120);
		features9 = features9.tolist();
		
		tensor10 = train9.shape[3];
		features10 = train9.pick(null,null,null,i);
		features10 = features10.reshape(120);
		features10 = features10.tolist();
		
		knnClassifier.addExample(features3,0);
		knnClassifier.addExample(features2,4);
		knnClassifier.addExample(features,2);
		knnClassifier.addExample(features4,1);
		knnClassifier.addExample(features5,3);
		knnClassifier.addExample(features6,5);
		knnClassifier.addExample(features7,6);
		knnClassifier.addExample(features8,7);
		knnClassifier.addExample(features9,8);
		knnClassifier.addExample(features10,9);
	}
	trainingCompleted = true;
}

function Test(){
	var currentFeatures;
	var features;
	CenterData();
	
	//for(var i = 0; i < test.shape[3] ; i++){
		currentFeatures = framesOfData.pick(null,null,null);
		features = currentFeatures.reshape(120);
		features = features.tolist();
		predictedLabel = knnClassifier.classify(features, GotResults);
	//}
}

function GotResults(err, result){
	//testingSampleIndex++;
	if (testingSampleIndex >= framesOfData.shape[3]){
		testingSampleIndex = 0;
	}
	predictedClassLabels.set(testingSampleIndex,parseInt(result.label));
	//console.log(predictedClassLabels.toString())
	//console.log("Predicted: ", parseInt(result.label))
	var modifier=0;
	if(parseInt(result.label)==0){
		modifier=1;
	}	
	prediction = ((numPredictions-1)*prediction + (modifier))/numPredictions;
	console.log(numPredictions,prediction,parseInt(result.label))
	numPredictions++;
	testingSampleIndex++;
}

function CenterData(){
	CenterXData();
	CenterYData();
}
function CenterXData(){
	var currentMean;
	var horizontalShift;
	var xValues = framesOfData.slice([],[],[0,6,3]);
	currentMean = xValues.mean();
	horizontalShift = 0.5-currentMean;
	var shiftedX;
	for (var i = 0;i<5;i++){
		for(var j=0;j<4;j++){
			currentX = framesOfData.get(i,j,0);
			shiftedX = currentX + horizontalShift;
			framesOfData.set(i,j,0, shiftedX);
			currentX = framesOfData.get(i,j,3);
			shiftedX = currentX + horizontalShift;
			framesOfData.set(i,j,3, shiftedX);
		}
	}
}
function CenterYData(){
	var currentMean;
	var verticalShift;
	var yValues = framesOfData.slice([],[],[1,6,3]);
	currentMean = yValues.mean();
	verticalShift = 0.5-currentMean;
	var shiftedY;
	for (var i = 0;i<5;i++){
		for(var j=0;j<4;j++){
			currentY = framesOfData.get(i,j,1);
			shiftedY = currentX + verticalShift;
			framesOfData.set(i,j,1, shiftedY);
			currentY = framesOfData.get(i,j,4);
			shiftedY = currentY + verticalShift;
			framesOfData.set(i,j,4, shiftedY);
		}
	}
}	

Leap.loop(controllerOptions, function(frame){
	currentNumHands = frame.hands.length;
	clear();
	if (trainingCompleted == false){
		Train();
	}
	console.log("Training Completed")
	changeBackground();
	HandleFrame(frame);
	//console.log(framesOfData.toString())
	//Test();
	previousNumHands = currentNumHands;
}
);


