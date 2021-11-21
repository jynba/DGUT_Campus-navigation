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
    value3: "",
    id:"",
    task:{}
  },
  pageBack(){
    wx.navigateBack();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  showmap:function(options){
      location.get().then(res=>{
        //拿到res=option.id后用setData渲染到界面
        this.data.task=res.data;
        console.log(this.data.task);
      })
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
        name:e.detail.value.name
      }
    }).then(res=>{
      that.data.id=res._id;
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
  deletefunction:function(){
    wx.cloud.callFunction({
      name:"deletemap"
    }).then(res=>{
      console.log(res)
      wx.showToast({
        title: '删除成功',
        icon:'success',
        // success:res2=>{
        //   console.log(res2)
        // },
      })
    })
  },
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