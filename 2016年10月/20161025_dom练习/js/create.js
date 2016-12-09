(function(){
	var imgList = document.querySelector('#imgList');
		//console.log(data.length);
	for(var i = 0 ; i < data.length; i++){
		var ul = document.createElement("ul");
		for(var j = 0; j < data[i].length; j++){
			var liData = data[i][j];
			var li = document.createElement("li");
			var imgs = document.createElement("div");
			imgs.className = "imgs";


			var a = document.createElement("a");
			var img = new Image();//创建img对象
			var gradient  = document.createElement('span');
			var title = document.createElement('strong');
			var author = document.createElement('span');
			var playIco = document.createElement('span');
			gradient.className = 'gradient';
			title.className = 'title';
			author.className = 'author';
			playIco.className = 'playIco';

			img.src = liData.src;
			title.innerHTML = liData.title;
			author.innerHTML = liData.author;
			a.appendChild(img);
			a.appendChild(gradient);
			a.appendChild(title);
			a.appendChild(author);
			a.appendChild(playIco);
			imgs.appendChild(a);
			if(i==0&&j==0){ //i=0并且j等于0的时候liID为index
				li.id = "index";
			}
			li.appendChild(imgs);
			ul.appendChild(li);
		}
		imgList.appendChild(ul);
	}
}
)();