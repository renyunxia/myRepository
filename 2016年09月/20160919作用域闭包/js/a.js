//高版本的
(function(w){
	function css(ele,attr){
		return getComputedStyle(ele)[attr];
	}

	
	w.a = css;
})(window);