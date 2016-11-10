var sourceType = [ ['camera'], ['album'], ['camera', 'album'] ]
var sizeType = [ ['compressed'], ['original'], ['compressed', 'original'] ]
var app = getApp()

Page({
  data: {
    sourceTypeIndex: 0,
    sourceType: ['拍照', '相册', '拍照或相册'],

    countryTypeIndex: 0,
    countryType: ['中国', '美国', '俄国'],

    provinceTypeIndex: 0,
    provinceType: ['黑龙江', '吉林', '辽宁'],

    cityTypeIndex: 0,
    cityType: ['城市1', '城市2', '城市3'],

    schoolIndex: 0,
    schoolName: ['大学1', '大学2', '大学3'],

    sizeTypeIndex: 0,
    sizeType: ['压缩', '原图', '压缩或原图'],

    countIndex: 0,
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],

    addImage:false,
    minusImage:true
  
  },
  countryTypeChange: function (e) {
    this.setData({
      countryTypeIndex: e.detail.value
    })
  },
  provinceTypeChange: function (e) {
    this.setData({
      provinceTypeIndex: e.detail.value
    })
  },
  cityTypeChange: function (e) {
    this.setData({
      cityTypeIndex: e.detail.value
    })
  },
  schoolChange: function (e) {
    this.setData({
      schoolIndex: e.detail.value
    })
  },
  sourceTypeChange: function (e) {
    this.setData({
      sourceTypeIndex: e.detail.value
    })
  },
  sizeTypeChange: function (e) {
    this.setData({
      sizeTypeIndex: e.detail.value
    })
  },
  countChange: function (e) {
    this.setData({
      countIndex: e.detail.value
    })
  },
  addImage: function (e) {
    
      this.setData({
        minusImage:false,
      }) 
    
    if(this.data.imageList&&this.data.imageList.length>=6){
      this.setData({
        addImage:true,
      }) 
    }



    var that = this
    wx.chooseImage({
      sourceType: sourceType[this.data.sourceTypeIndex],
      sizeType: sizeType[this.data.sizeTypeIndex],
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        console.log(res)
        var imageList = that.data.imageList;
        if(imageList){
            Array.prototype.push.apply(imageList, res.tempFilePaths);
        }else{
          imageList=res.tempFilePaths;
        }
        that.setData({
          imageList: imageList
        })


          
          var tempFilePaths = res.tempFilePaths
          wx.uploadFile({
            url: 'http://localhost:8080/biz/signUserPic',
            filePath: tempFilePaths[0],
            name: 'file',
            formData:{
            'a': 'test'
            },
            success:function(resData){
              console.log(resdata);
            }
            
          })
        
      }






    })
  },
  minusImage:function(e){
    if(this.data.imageList.length==1){
      this.setData({
        minusImage:true
      })  
    }
    var imageList=this.data.imageList.slice(0,this.data.imageList.length-1);
    this.setData({
      addImage:false,
      imageList:imageList
    })
  },
  previewImage: function (e) {
    var current = e.target.dataset.src
    console.log("------------------:"+current);
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  onLoad: function (e) {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  submit:function(e){
    wx.showToast({
      title: '注册成功',
      icon: 'success',
      duration: 2000,
      success: function(res) {
        if (true) {
          setTimeout(function(){
            wx.navigateTo({
              url: '../index2/index2'
            })
          },1000)    
        }
      }
    })
    
  }

})





