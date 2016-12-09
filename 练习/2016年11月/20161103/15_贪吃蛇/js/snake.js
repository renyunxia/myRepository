/*  思路：
1、生成地图，根据 mapX mapY 对应地图的每一行和每一行的每一个单元格
2、存储每个单元格，把每一行看作二维数组中的第一维的每一项，然后把每一行中的每个单元格看作二维数组中的第二维数组里面的每一项
3、创建空的二维数组容器，二维中的每一项都是undefined
4、创建一个数据层面的我二维数组，目的就是用来做碰撞检测
5、设定范围scope 函数，用来限制随机物品出现的坐标 x,y
6、随机数函数
7、定义蛇，并绘制出来
8、让蛇走起来，并且可以控制方向
9、添加物品
10、随机添加各种玩具
11、清除画布
12、
*/


//--------------------------------------------------------------
//变量的声明部分
var mapX = 20,mapY = 20;
var snakeData = createArr(mapX,mapY);
var mapData = createArr(mapX,mapY);

var snake = []; //[[x1,y2],[x2,y2],[x3,y3]]
var len = 3; //蛇的长度
var speed = 10; //速度

var snakeTimer = null;
var skateTimer = [];
var breakTimer = [];

var direction = 39;
var flag = true;
var sore = document.getElementById('score');
var statGame = document.getElementById('start');



//---------------------------------------------------------
//初始化部分
createMap(mapX,mapX);
statGame.onclick = start;
function start(){
	this.onclick = null;
	clear();
	initSnake();
	addobj('food');
	addToy();
	walk();
}

// createArr(mapX,mapX);


//---------------------------------------------------------
//需求函数化部分

//需求1：生成地图
function createMap(x,y){
	var map = document.getElementById('map');
	var table = document.createElement('table');
	table.cellPadding = table.cellSpacing = 0;
	var tbody = table.createTBody();
	for (var i = 0; i < x; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < y; j++) {
			var td = document.createElement('td');
			snakeData[i][j] = tr.appendChild(td);
		};
		tbody.appendChild(tr);
	};
	table.appendChild(tbody);
	map.appendChild(table);
}

//需求2：创建二维数组
function createArr(x,y){
	var arr = new Array(x);
	for (var i = 0; i < x; i++) {
		arr[i] = new Array(y);
	};
	return arr;
}

//需求3：设定范围
function scope(startX,startY,endX,endY){
	startX = startX || 0;
	startY = startY || 0;
	endX = endX || mapX - 1;
	endY = endY || mapY - 1;
	var p = [],
		y = rP([startX,endX]),
		x = rP([startY,endY]);
	p.push(x,y);
	//用来判断这个点生成的位置是否有物品，如果有就重复执行上面的代码
	if(mapData[x][y]){
		return scope(startX,startY,endX,endY);
	}
	return p;
}

//需求4：编写随机函数
function rP(arr){
	var max = Math.max.apply(null,arr);
	var min = Math.min.apply(null,arr);
	return Math.round(Math.random() * (max - min) + min);
}

//需求5：初始化蛇
function initSnake(){
	//找到一个随机的点，但是这个点必须符合指定的范围，不能碰撞，也不能截取
	var p = scope(0,2,mapX - 1,parseInt(mapY/2));
	for (var i = 0; i < len; i++) {
		var x = p[0],  //某一行
			y = p[1] - i;  //某一行中的 挨着的 3个td
			snake.push([x,y]);   
			//放到蛇的数组中，这样这个数组就存了3点挨着的点
			snakeData[x][y].className = 'snake';  //绘制蛇
			mapData[x][y] = 'snake';  //在数组层面注册蛇的数据
	};
}
// walk();
//需求6：让蛇走起来
function walk(){
	clearInterval(snakeTimer);
	snakeTimer = setInterval(step,5000/speed);
}

//需求7：控制蛇的运动
function step(){
	var headX = snake[0][0],
		headY = snake[0][1];
		switch(direction){
			case 37:
				headY -= 1; //蛇头位置
				break;
			case 38:
				headX -= 1; //上一行
				break;
			case 39:
				headY += 1;
				break;
			case 40:
				headX += 1;
		}
		if(headX < 0 || headX > mapX - 1 || headY < 0 || headY > mapY-1 || mapData[headX][headY] == 'snake'||
		 mapData[headX][headY] == 'block'){
			clearInterval(snakeTimer);
			skateTimer.forEach((item,i)=>{
				clearTimeout(item);
			});
			breakTimer.forEach((item,i)=>{
				clearTimeout(item);
			});
			alert("Game Over");
			statGame.onclick = start; 
			return;
		}

		//吃到三块东西后加快速度
		if(len%4 == 0 && len < 55 && mapData[headX][headY] == 'food'){
			speed += 5;
			walk();
		}
		if(len%9 == 0 && len < 55 && mapData[headX][headY] == 'food'){
			addobj('block');
		}
		//碰到滑板加速
		if(mapData[headX][headY] == 'skate'){
			speed += 15;
			walk();
		}
		//碰到刹车减速
		if(mapData[headX][headY] == 'break'){
			speed = 10;
			walk();
		}
		//吃东西
		if(mapData[headX][headY] == 'food'){
			addobj('food');
			mapData[headX][headY] = true;
		}

		//判断 去掉蛇尾 
		if(!mapData[headX][headY]){
			var lastX = snake[snake.length - 1][0];
			var lastY = snake[snake.length - 1][1];
			snakeData[lastX][lastY].className = '';
			snake.pop();
			mapData[lastX][lastY] = false;
		}

		snake.unshift([headX,headY]);
		snakeData[headX][headY].className = 'snake';
		mapData[headX][headY] = 'snake';
		len = snake.length;
		score.innerHTML = (len - 3) * 10;
		flag = true;
}

//需求8：控制方向
document.onkeydown = function(e){
	var e = e || window.event;
	if(!flag){
		return;
	}
	if(e.keyCode > 36 && e.keyCode < 41 && Math.abs(e.keyCode - direction) != 2){
		direction = e.keyCode;
	}
	flag = false;
	return false;
}

//需求9：添加随机的物品
function addobj(name){
	var p = scope();
	snakeData[p[0]][p[1]].className = name;
	mapData[p[0]][p[1]] = name;
}

//需求10：添加随机数量的滑板和刹车
function addToy(){
	var skateNum = rP([6,10]);
	var breakNum = rP([4,6]);
	console.log(skateNum,breakNum);
	for (var i = 0; i < skateNum; i++) {
		skateTimer.push(setTimeout(function(){
			addobj('skate');    //定时器里面添加滑板 在8秒到2分钟内
		},rP([8000,120000])))
	};
	for (var i = 0; i < breakNum; i++) {
		breakTimer.push(setTimeout(function(){
			addobj('break');    //定时器里面添加刹车 在10秒到3分钟内
		},rP([10000,160000])))
	};
}

//需求11：清除地图
function clear(){
	snakeData.forEach((item,i)=>{
		item.forEach((item,i)=>{
			item.className = '';
		})
	})
	mapData = createArr(mapX,mapY);
	direction = 39;
	snake = [];
	len = 3;
	speed = 10;
	score.innerHTML = 0;
}