var model
fetch('https://raw.githubusercontent.com/jamiegavis/destiny-lore/master/model.json')
  .then(response => response.json()).then(data => model = data)

var c_dist = 0 

//random int 0 to c_dist
Math.floor(Math.random()*(c_dist+1)) //+1 since floor 


/*
Build a Python representation of the Markov model. Returns a dict
of dicts where the keys of the outer dict represent all possible states,
and point to the inner dicts. The inner dicts represent all possibilities
for the "next" item in the chain, along with the count of times it
appears.
*/


