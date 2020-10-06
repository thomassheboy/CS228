nj.config.printThreshold = 1000;

var trainingCompleted = false;
const knnClassifier = ml5.KNNClassifier();

var numFeatures;
var numSamples = train2.shape[3];
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
	var tensor;
	var features;
	var tensor2;
	var features;
	for(var i = 0; i < train4.shape[3] ; i++){
		tensor = train2.shape[3];
		features = train2.pick(null,null,null,i);
		features = features.reshape(120);
		features = features.tolist();
		
		tensor2 = train4.shape[3];
		features2 = train4.pick(null,null,null,i);
		features2 = features2.reshape(120);
		features2 = features2.tolist();
		knnClassifier.addExample(features2,4);
		knnClassifier.addExample(features,2);
	}
	trainingCompleted = true;
}

function Test(){
	var currentFeatures;
	var features;
	
	for(var i = 0; i < test.shape[3] ; i++){
		currentFeatures = test.pick(null,null,null,i);
		features = currentFeatures.reshape(120);
		features = features.tolist();
		predictedLabel = knnClassifier.classify(features, GotResults);
	}
}

function GotResults(err, result){
	testingSampleIndex++;
	if (testingSampleIndex >= test.shape[3]){
		testingSampleIndex = 0;
	}
	predictedClassLabels.set(testingSampleIndex,parseInt(result.label));
	console.log(predictedClassLabels.toString())
}


