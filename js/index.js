


// H5 plus事件处理
function plusReady(){
	// 设置系统状态栏背景为红色
	plus.navigator.setStatusBarBackground('#a2ebe2');
	plus.nativeUI.closeWaiting();
}
if(window.plus){
	plusReady();
}else{ 
	document.addEventListener('plusready', plusReady, false);
}



//页面跳转
document.querySelector('#userBtn').addEventListener('tap', function() {
    mui.openWindow({url:'user.html'});
    plus.nativeUI.closeWaiting();
});

document.querySelector('#shopBtn').addEventListener('tap', function() {
    mui.openWindow({url:'shop.html'});
    plus.nativeUI.closeWaiting();
});


document.querySelector('#startClicked').addEventListener('tap', function() {
    mui.openWindow({url:'time.html'});
    plus.nativeUI.closeWaiting();
});


//返回确认

mui.back = function(){
	var btn = ["确定","取消"];
	mui.confirm('确认关闭程序？','',btn,function(e){
	if(e.index==0){
	mui.currentWebview.close();
}
});
}


//localstorage存取json对象事例
//var json_data = {id:12,name:"yang",email:"aaa@aaa.com"};  
//storage.setItem("json_data",JSON.stringify(json_data));  
var moneyVal = 0 ;
function countMoney(){
	//console.log(localStorage.hasOwnProperty('userDetails'));  //判断是否有userDetails的属性
	if(localStorage.hasOwnProperty('userDetails')===false||localStorage.hasOwnProperty('buyInfo')===false||localStorage.hasOwnProperty('useInfo')===false){
		var userDetails = [];
    	localStorage.userDetails = JSON.stringify(userDetails);
    	var buyDetails = [{goods:"milk",price:"10",count:"0"},{goods:"honey",price:"10",count:"0"}];
		localStorage.buyInfo = JSON.stringify(buyDetails)
		var useDetails = [{goods:"milk",price:"10",count:"0"},{goods:"honey",price:"10",count:"0"}];
		localStorage.useInfo = JSON.stringify(buyDetails)
	}   //没有则在localstorgae中添加
	
	else{
		userDetails = JSON.parse(localStorage.userDetails);
		buyDetails = JSON.parse(localStorage.buyInfo);
		for(var i=0; i<userDetails.length;i++){
			moneyVal += parseInt(userDetails[i].money);  //加上每次的金币
			console.log(moneyVal);
		}
		for(var i=0; i<buyDetails.length; i++){
			moneyVal -= parseInt(buyDetails[i].price*buyDetails[i].count); //减去购买商品的价格
		}
	}
	$("#moneyVal").append(moneyVal);
	localStorage.totalMoney = moneyVal;
}
countMoney();



//显示选择的时长
localStorage.time = 6;
function moveChange(){
	$("#timeSelected").empty();
	timeSelectorVal = document.getElementById("timeSelector").value;
	$("#timeSelected").append(timeSelectorVal+":00");
	//localStorage.removeItem('time');
	localStorage.time = timeSelectorVal;
}




