var myDate = new Date();
var year = myDate.getFullYear().toString();    //获取完整的年份(4位,1970-????)
var month = (myDate.getMonth()+1).toString();       //获取当前月份(0-11,0代表1月)
var day = myDate.getDate().toString();        //获取当前日(1-31)
var dateString = year+'-'+month+'-'+day;
//console.log(dateString);

var userDetailsArr = JSON.parse(localStorage.getItem("userDetails"))
userDetailsArr.push({money:localStorage.time, userDate:dateString});
localStorage.setItem("userDetails", JSON.stringify(userDetailsArr));

document.querySelector('#backButton').addEventListener('tap', function() {
    mui.openWindow({url:'index.html'});
    plus.nativeUI.closeWaiting();
});


var intDiff = localStorage.time*60;//倒计时总秒数量
function timer(intDiff){
    window.setInterval(function(){
    var minute=0,
        second=0;//时间默认值        
    if(intDiff >= 0){
        minute = Math.floor(intDiff / 60);
        second = Math.floor(intDiff) - (minute * 60);
    }
    else if(intDiff>-2){
    	mobileShake();	
	}
    else if(intDiff>-6){
    	mobileShake();
    }
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    $('#minute_show').html('<s></s>'+minute+':');
    $('#second_show').html('<s></s>'+second);
    intDiff--;
    }, 1000);
}


$(function(){
    timer(intDiff);
}); 

//禁止返回键返回
//mui.back = function(){}

function mobileShake(){
	switch ( plus.os.name ) { //判断设备类型
			case "iOS":
				if ( plus.device.model.indexOf("iPhone") >= 0 ) { //判断是否为iPhone
					//plus.device.beep();
					 plus.device.vibrate( );
					console.log("设备振动中...");
				} else {
					console.log("此设备不支持振动");
			    }
			break;
				default:
					plus.device.vibrate(500);    		
					break;
	}
}

