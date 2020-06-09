var markov = new Object();
var exported = 'https://raw.githubusercontent.com/jamiegavis/destiny-lore/master/model.json';

fetch(exported)
	.then(response => response.json())
	.then(data => JSON.parse(data["chain"]))
	.then(model => buildMarkov(model))
	.then(success => textGen()); //works but promises issue

var ranInt = (maximum) => Math.floor(Math.random()*maximum);

function buildMarkov(m) { 
	var rolling
	for (let i = 0; i < m.length; i++) {
		rolling = 0 
		markov[m[i][0]] = []
		for (let [key,value] of Object.entries(m[i][1])) {
			rolling += value
			markov[m[i][0]].push([rolling, key])	//memory concerns?		
		}
	}
}; 

function step(state) {
	var rand = ranInt(markov[state][markov[state].length-1][0])
	for (let i = 0; i < markov[state].length; i++) {
		if (rand < markov[state][i][0]) return markov[state][i][1]
	}	 
};

function walk(start,minWords=1,tries=10) {
	let attempts = 0
	var sentence = []
	while (sentence.length < minWords && attempts < tries) {
		sentence = ["___BEGIN__"]
		sentence.push(step(start))
		while (sentence[sentence.length-1] !== "___END__") {
			//console.log(sentence) //debugging
			var state = sentence.slice(sentence.length-2).join(",")
			sentence.push(step(state))	
		}	
	}	
	return sentence
};

function textGen() {
	let text = walk("___BEGIN__,___BEGIN__",50)
	var textStr = text.slice(1,text.length-1).join(" ")
	return textStr
};
