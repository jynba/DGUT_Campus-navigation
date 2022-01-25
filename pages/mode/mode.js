// pages/mode/mode.js
var app = getApp();
const db=wx.cloud.database();
const location=db.collection('location')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: "",
    value2: "",
    id:"",
    task:{},
    image: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  selectImage:function(e){
    wx.chooseImage({
      count : 1,
      sizeType :['compressed'],
      sourceType:['album','camera'],
      success:res=>{
        console.log(res.tempFilePaths[0])
        wx.cloud.uploadFile({
          cloudPath:`${Math.floor(Math.random()*1000000)}.jpg`,
          //~使得每次上传的图片名字不一样
          filePath: res.tempFilePaths[0],
        }).then(res=>{
          this.setData({
            image:res.fileID
          })
        }).catch(err=>{
          console.log(err)
        })
      },
    })
  },
  
  onLoad: function (options) {
    this.getmyPlace();
  },
  getmyPlace: function () {
    var that = this;
    wx.getLocation({
      type: "gcj02",
      success: function (res) {
        console.log(res);
        that.setData({
          value1:res.latitude,
          value2:res.longitude,
        })
      },
      fail: function (err) {
        console.log("获取失败: ", err)
      }
    })
  },
  onSubmit: function(e){
    var that = this;
    console.log(e);
    location.add({
      data:{
        latitude:that.data.value1,
        longitude:that.data.value2,
        name:e.detail.value.name,
        image:that.data.image,
        address:e.detail.value.address
      }
    }).then(res=>{
      that.data.id=res._id;
      console.log(that.data.id)
      wx.showToast({
        title: '上传成功',
        icon:'success',
        duration:1000,
        success:res2=>{
          setTimeout(function(){
            wx.switchTab({
              url: `../home/home`,
            })//提交后跳转
          },1000)
        },
      })
    })
  },
  enlarge: function (e) {
    wx.previewImage({
      urls: [this.data.image], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  
  // deletefunction:function(){
  //   wx.cloud.callFunction({
  //     name:"deletemap"
  //   }).then(res=>{
  //     console.log(res)
  //     wx.showToast({
  //       title: '删除成功',
  //       icon:'success',
  //       // success:res2=>{
  //       //   console.log(res2)
  //       // },
  //     })
  //   })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})