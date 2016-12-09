onmessage = function(e){
	e.data.sort(function(){
		return Math.random() - .5;
	});
	postMessage(e.data);
};