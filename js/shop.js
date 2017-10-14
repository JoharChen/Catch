function touClass(){
// 公有方法
	this.touch = function(fn1,fn2){
	this.addEventListener('touchstart',function(event){
	var touch = event.targetTouches[0];
// 开始坐标
	this.startx = touch.pageX;
	this.starty = touch.pageY;
	})
	this.addEventListener('touchmove',function(event){
	var touch = event.targetTouches[0];
	// 结束坐标
	this.endx = touch.pageX;
	this.endy = touch.pageY;
	var x = this.endx - this.startx;
	var y = this.endy - this.starty;
	var w = x<0?x-1:x; //x轴的滑动值, w为x的绝对值
	var h = y<0?y-1:y; //y轴的滑动值
	if(w>h){ //如果是在x轴中滑动,阻止默认事件
		event.preventDefault(); // 解决微信touchmove冲突并实现上下可滑动
	}})
	this.addEventListener('touchend',function(event){
	if((this.startx - this.endx)>=100 && fn1){
	// 执行左滑回调
		fn1();
	}
	if((this.endx - this.startx)>=100 && fn2){
// 执行右滑回调
		fn2();
	}})
	}
}


//右滑返回
touClass.call(document);

document.touch('',function(){
	mui.back();
});

localStorage.tempMoney = localStorage.totalMoney;
var milkValue = parseInt(document.getElementById("milkValue").innerText.substring(0,2));
var honeyValue = parseInt(document.getElementById("honeyValue").innerText.substring(0,2));

//判断是否金钱能否购买该商品
var buyOrNot = false;
buyInfo = JSON.parse(localStorage.buyInfo);

useInfo = JSON.parse(localStorage.useInfo);

function judgeWheatherToBuy(goodsMoney){
	if(goodsMoney>localStorage.totalMoney){
		mui.alert("金币不足，无法购买");
	}
	else{
		mui.alert("购买成功");
		buyOrNot = true;
	}
}


document.querySelector('#milk').addEventListener('tap', function() {
    judgeWheatherToBuy(milkValue);
    if(buyOrNot == true){
		buyInfo[0].count++;
		localStorage.buyInfo = JSON.stringify(buyInfo);
		$("#milkMount").empty();
		$("#milkMount").append(buyInfo[0].count+"瓶");
    }
});

document.querySelector('#buyMilk').addEventListener('tap', function() {
    judgeWheatherToBuy(milkValue);
    if(buyOrNot == true){
		buyInfo[0].count++;
		localStorage.buyInfo = JSON.stringify(buyInfo);
		$("#milkMount").empty();
		$("#milkMount").append(buyInfo[0].count+"瓶");
    }
});
//
document.querySelector('#useMilk').addEventListener('tap', function() {
    if(buyInfo[0].count<=0){
		mui.alert("无法使用");
	}
	else{
		//localStorage.tempMoney -=10;
		mui.alert("使用成功");
		useInfo[0].count++;
		localStorage.useInfo = JSON.stringify(useInfo);
		$("#milkMount").empty();
		$("#milkMount").append((buyInfo[0].count-useInfo[0].count)+"瓶");
	}
});

document.querySelector('#honey').addEventListener('tap', function() {
    judgeWheatherToBuy(honeyValue);
    if(buyOrNot == true){
		buyInfo[1].count++;
		localStorage.buyInfo = JSON.stringify(buyInfo);
		$("#honeyMount").empty();
		$("#honeyMount").append(buyInfo[1].count+"瓶");
    }
});

document.querySelector('#buyHoney').addEventListener('tap', function() {
    judgeWheatherToBuy(honeyValue);
    if(buyOrNot == true){
		buyInfo[1].count++;
		localStorage.buyInfo = JSON.stringify(buyInfo);
		$("#honeyMount").empty();
		$("#honeyMount").append(buyInfo[1].count+"瓶");
    }
});

//
document.querySelector('#useHoney').addEventListener('tap', function() {
    if(buyInfo[1].count==0){
		mui.alert("无法使用");
	}
	else{
		mui.alert("使用成功");
		useInfo[1].count++;
		//localStorage.tempMoney -=10;
		localStorage.useInfo = JSON.stringify(useInfo);
		$("#honeyMount").empty();
		$("#honeyMount").append((buyInfo[1].count-useInfo[1].count)+"瓶");
	}
});


//显示商品个数
//<a id="honeyValue"style="position:absolute; left: 58%; top: 180px;">10$</a>
$("#milkMount").append(buyInfo[0].count+"瓶");
$("#honeyMount").append(buyInfo[1].count+"瓶");
