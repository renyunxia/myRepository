function myWheel(obj,callBack){
	obj.addEventListener('DOMMouseScroll',wheelFn); //ff就要走DOMMouseScroll
	obj.addEventListener('mousewheel',wheelFn);  //chrome就要走mousewheel
	// if (window.navigator.userAgent.toLowerCase().indexOf('Firefox')!= -1){
	// 	obj.addEventListener('DOMMouseScroll',wheelFn);
	// }else{
	// 	obj.addEventListener('mousewheel',wheelFn);
	// };
	function wheelFn(ev){
		var down = true;
		if(ev.wheelDelta){
			down = ev.wheelDelta > 0 ? true : false;
		}else{
			down = ev.detail < 0 ? true : false;
		};

		// 1.传callback，2.callback必须为函数
		if(callBack && typeof callBack === 'function'){
			callBack(down);
		}
		ev.preventDefault();
	}
}