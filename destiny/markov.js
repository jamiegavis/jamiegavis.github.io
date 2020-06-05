var model,c_dist,ranGen,i
var markov = new Object();

fetch('https://raw.githubusercontent.com/jamiegavis/destiny-lore/master/model.json')
	.then(response => response.json())
	.then(data => JSON.parse(data["chain"]))
	.then(model => buildMarkov(model));

ranGen = (maximum) => Math.ceil(Math.random()*maximum);

buildMarkov = (m) => { 
	for (i = 0; i < m.length; i++) { 
	    markov[m[i][0]] = markov[m[i][1]] 
	}
} 

/*
Build a Python representation of the Markov model. Returns a dict
of dicts where the keys of the outer dict represent all possible states,
and point to the inner dicts. The inner dicts represent all possibilities
for the "next" item in the chain, along with the count of times it
appears.
*/


