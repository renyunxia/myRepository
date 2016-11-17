(function(drap){
	var box = document.getElementById('box');
	box.addEventListener('mousedown',down);
	function down(ev){
		var disX = ev.pageX - box.offsetLeft;
		var divY = ev.pageY - box.offsetTop;
		document.addEventListener('onmousedown''move');
		document.addEventListener('onmousemove''up')
		function down(ev){
			var left = ev.pageX - disX;
			var top = ev.pageY - divY;
			box.style.left = left + 'px';
			box.style.left = top + 'px';
		}
		function up(){
			document.onmouseup = document.onmousemove = null;
		}
	}
})();