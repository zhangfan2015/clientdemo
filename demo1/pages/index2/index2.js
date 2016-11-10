
var app = getApp();
var monthConvert = ["","一","二","三","四","五","六","七","八","九","十","十一","十二"]
Page({
  data: {
    
  },
  onLoad:function(){
    var now = new Date();

    this.setData({
      date:monthConvert[now.getMonth()]
    })
  },
  bindDateChange: function(e) {
    
    var ymd = e.detail.value;
    var month = ymd.split("-")[1];

    
      month = monthConvert[parseInt(month)];
    

    
    this.setData({
      date: month
    })
  },
  showClass:function(e){
    wx.navigateTo({
              url: '../checkinLog/checkinLog'
            })
  }
  
})