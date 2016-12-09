//低版本
(function(w){
	function css(ele,attr){

		return ele.currentStyle[attr];
	}
	w.b = css;
})(window)
