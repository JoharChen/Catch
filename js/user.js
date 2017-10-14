//mui.init({
// 		 		swipeBack:true //启用右滑关闭功能
//			});

var myDate = new Date();
var year = myDate.getFullYear().toString();    //获取完整的年份(4位,1970-????)
var month = (myDate.getMonth()+1).toString();       //获取当前月份(0-11,0代表1月)
var day = myDate.getDate().toString();        //获取当前日(1-31)
//var dateString = year+'-'+month+'-'+day;

var dateStringArr = [];
for(var i=4;i>=0;i--){    //近5天时间
	dateStringArr.push(year+'-'+month+'-'+(day-i));
}
console.log(dateStringArr);

var userDetails = JSON.parse(localStorage.userDetails);
console.log(userDetails);
var everyDayTotalTime = [];
var userDayTime = 0;
for(var j=0; j<dateStringArr.length; j++){
	userDayTime = 0;
	for(var i=0; i<userDetails.length; i++){
		if(dateStringArr[j]===userDetails[i].userDate){
			userDayTime += parseInt(userDetails[i].money);
		}
	}
	everyDayTotalTime.push(userDayTime*10);
}
console.log(everyDayTotalTime);
localStorage.fiveDayTime = JSON.stringify(everyDayTotalTime);


var showDate = [];
for(var i=4; i>=0;i--){
	showDate.push((parseInt(month))+'月'+(day-i)+'日');
}
console.log(showDate);


//显示图表
var myChart = echarts.init(document.getElementById('chart'));

option = {
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : showDate,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'时长',
            type:'bar',
            barWidth: '60%',
            data:everyDayTotalTime
        }
    ]
};
myChart.setOption(option);







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