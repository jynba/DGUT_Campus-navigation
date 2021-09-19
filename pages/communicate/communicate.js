
var app = getApp()
// pages/chat/chat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headLeft: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20170615%2Fc086390a048d46aab7c87bfe801d771e.jpg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633436309&t=359ad46171be2a0fd44082818eaa1df5',
    headRight: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1636096978,3638354018&fm=26&gp=0.jpg',
    syas: [{
      'robot': '我是助手冰冰,来跟我留言吧！',
      'isay': '你好！',
    }],
    value:''
  },

  /**
     * 发送事件处理函数
     */
  converSation(e) {
    console.log(e)
    let that = this
    console.log(e.detail.value.says)
    let obj = {},
      isay = e.detail.value.says,
      syas = this.data.syas,
      length = syas.length
      let tuling = '谢谢！您的留言将被处理';
      obj.robot = tuling;
      obj.isay = isay;
      syas[length] = obj;
      that.setData({
        syas: syas,
        value:''
      })
    //发送
  },
  deleteChat(){
    this.setData({
      value:''
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
   
  onLoad: function (options) {
    let that = this;
    var globalvar = app.globalData.avatarUrl;
    console.log(app.globalData.avatarUrl)
    that.setData({
      headRight:globalvar
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
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
