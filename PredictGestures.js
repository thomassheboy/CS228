nj.config.printThreshold = 1000;

var trainingCompleted = false;
const knnClassifier = ml5.KNNClassifier();

var numFeatures;
var numSamples = train0.shape[3];
var testingSampleIndex = 0;
var predictedClassLabels = nj.zeros(numSamples);
function draw(){
	clear();
	if (trainingCompleted == false){
		Train();
	}
	Test();
}

function Train(){
	for(var i = 0; i < train0.shape[3] ; i++){
		var tensor = train0.shape[3];
		var features = train0.pick(null,null,null,i);
		features = features.reshape(120);
		features = features.tolist();
		//console.log(features.toString());
		knnClassifier.addExample(features,0);
		tensor = train1.shape[3];
		features = train1.pick(null,null,null,i);
		features = features.reshape(120);
		features = features.tolist();
		knnClassifier.addExample(features,1);
		
		
	}
	trainingCompleted = true;
}

function Test(){
	var rowPick;
	var currentFeatures;
	var currentLabel;
	var predictedLabel;
	var features;
	var i = testingSampleIndex;
	
	for(var i = 0; i < test.shape[3] ; i++){
		currentFeatures = test.pick(null,null,null,i)
		features = currentFeatures.reshape(120);
		features = features.tolist();
		predictedLabel = knnClassifier.classify(features, GotResults);
	}
	//console.log(rowPick.toString())
	//console.log(currentFeatures.toString())
	//console.log(currentLabel.toString())
	//if(i%2 == 1 && i <= 150){
		//rowPick = irisData.pick(i)
		//currentFeatures = rowPick.slice([0,4]);
		//currentLabel = rowPick.get(4);
		//features = currentFeatures.tolist();
			
		//console.log(rowPick.toString())
		//console.log(currentFeatures.toString())
		//console.log(currentLabel.toString())
			
		//predictedLabel = knnClassifier.classify(features);
		//console.log("Row: ", i)
		//console.log(rowPick.toString())
		//console.log(features.toString())
		//console.log("Actual: ", currentLabel.toString())
		//console.log("Predicted: ", predictedLabel)
	//}
}

function GotResults(err, result){
	//console.log("Index: ", testingSampleIndex)
	//console.log(parseInt(result.label))
	testingSampleIndex++;
	if (testingSampleIndex >= train0.shape[3]){
		testingSampleIndex = 0;
	}
	console.log(testingSampleIndex)
	predictedClassLabels.set(testingSampleIndex,parseInt(result.label));	
	console.log(predictedClassLabels.toString())
}


