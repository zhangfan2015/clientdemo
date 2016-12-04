//index.js
//获取应用实例


var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad');
    var dayArr = getDate(new Date());
    this.setData({
      date: dayArr[0].month,
      dayArr:dayArr,
      courtArr:getCurrCourtInfo(2)
    });
    wx.getSystemInfo({  
    success: function (res) {  
      var windowWidth = res.windowWidth;  
      var windowHeight = res.windowHeight;  
      var windowscale = windowHeight/windowWidth;//屏幕高宽比  
      console.log('windowWidth: ' + windowWidth)  
      console.log('windowHeight: ' + windowHeight)  
      // if(originalScale < windowscale){//图片高宽比小于屏幕高宽比  
      //   //图片缩放后的宽为屏幕宽  
      //    imageSize.imageWidth = windowWidth;  
      //    imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;  
      // }else{//图片高宽比大于屏幕高宽比  
      //   //图片缩放后的高为屏幕高  
      //    imageSize.imageHeight = windowHeight;  
      //    imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;  
      // }  
       
    }  
  })  ;
  },
  bindDateChange: function(e) {
    var ymd = e.detail.value;
    var month = ymd.split("-")[1];
    var day = ymd.split("-")[2];
    if(month.indexOf("0") == 0) {
      month = month.substring(1,2);
    }
    if(day.indexOf("0") == 0) {
      day = day.substring(1,2);
    }
    var currDate = new Date();
    currDate.setYear(ymd.split("-")[0]);
    currDate.setMonth(month);
    currDate.setDate(day);
    var dayArr = getDate(currDate);
    
    this.setData({
      date: month,
      dayArr:dayArr
    })
  },
  courtClick:function(e) {
    wx.navigateTo({
      url: '../signIn/signIn'
    })
  }
})
function getDate(selDate) {
    var date = new Date();
    var currDay = date.getDate(); //获取当前的日
    var month = selDate.getMonth() + 1;
    var day = selDate.getDate();
    var n = selDate.getDay();
    if(n == 0 ) {
      n = 7;
    }
    var startDay = day - n + 1;
    var dayArr = {};
    var defaultCss = "calendar-day";
    var selCss = "calendar-day-selected";
    for(var i=1;i<=7;i++) {
      var tmpDate = new Date();
      tmpDate.setDate(tmpDate.getDate() - n+i);
      var tmpDay = tmpDate.getDate();
      var obj = {
        "css":tmpDay == day?selCss:defaultCss,
        "day":tmpDay,
        "month":month
      };
      dayArr[i-1] = obj ;
    }
    return dayArr;
}
var mondayCourInfo = [{
  "courtName":"大学英语（IV）",
  "teacherName":"胡织女",
  "testTime":"未知",
  "courtWeek":"第1-17周",
  "courtTime":"8:30~9:45",
  "address":"教学楼1210",
  "state":"1",//进行中
  "courtSort":"1~2",
  "last":false
  },{
  "courtName":"电磁场与电磁波",
  "teacherName":"王忠结/谢小娟",
  "testTime":"未知",
  "courtWeek":"第1-17周",
  "courtTime":"10:00~11:45",
  "address":"物理楼3102",
  "state":"0",
  "courtSort":"3~4",
  "last":false
  },{
  "courtName":"通信技术基础实验（II）",
  "teacherName":"翟从鸿",
  "testTime":"未知",
  "courtWeek":"第4-16周",
  "courtTime":"13:15~3:00",
  "address":"教学楼1210",
  "state":"0",
  "courtSort":"5~6",
  "last":false
  },{
  "courtName":"通信技术基础实验（II）",
  "teacherName":"翟从鸿",
  "testTime":"未知",
  "courtWeek":"第4-16周",
  "courtTime":"3:15~5:45",
  "address":"教学楼1210",
  "state":"0",
  "courtSort":"7~8",
  "last":false
  },{
  "courtName":"演讲与口才",
  "teacherName":"刘勇 ",
  "testTime":"未知",
  "courtWeek":"第8-16周",
  "courtTime":"6:15~7:45",
  "address":"田楼8308",
  "state":"0",
  "courtSort":"9~10",
  "last":true
  }];
var tuesdayCourInfo = [{
  "courtName":"信号与系统",
  "teacherName":"张爱清",
  "testTime":"未知",
  "courtWeek":"第1-17周",
  "courtTime":"8:30~9:45",
  "address":"物理楼3302",
  "state":"1",//进行中
  "courtSort":"1~2",
  "last":false
  },{
  "courtName":"微机原理与接口技术",
  "teacherName":"谢小娟",
  "testTime":"未知",
  "courtWeek":"第1-17周",
  "courtTime":"10:00~11:45",
  "address":"物理楼3302",
  "state":"0",
  "courtSort":"3~4",
  "last":false
  },{
  "courtName":"体育（IV）",
  "teacherName":"吴本连",
  "testTime":"未知",
  "courtWeek":"第1-17周",
  "courtTime":"13:15~3:00",
  "address":"赭山校区体育馆",
  "state":"0",
  "courtSort":"5~6",
  "last":false
  },{
  "courtName":"毛泽东思想和中国特色社会主义理论体系概论",
  "teacherName":"高文娟",
  "testTime":"未知",
  "courtWeek":"第1-17周",
  "courtTime":"3:15~5:45",
  "address":"物理楼3302",
  "state":"0",
  "courtSort":"7~8",
  "last":false
  },{
  "courtName":"旅游文化",
  "teacherName":"黄成林 ",
  "testTime":"未知",
  "courtWeek":"第1-17周",
  "courtTime":"6:15~7:45",
  "address":"教学楼1409",
  "state":"0",
  "courtSort":"9~10",
  "last":true
  }];
  function getCurrCourtInfo(week) {
    switch (week) {
      case 1:
        return mondayCourInfo;
      case 2:
        return tuesdayCourInfo;
    }
  }