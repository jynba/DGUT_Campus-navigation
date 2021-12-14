
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loading: false,
    plain: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that = this
    wx.request({
      url: 'https://css.dgut.edu.cn/api/article/list/news?size=10',
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        for(let i =0;i<res.data.data.content.length;i++){
          res.data.data.content[i].createTime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data.data.content[i].createTime)
        }
        that.setData({
          list: [{
            header: '学院要闻'
          }].concat(res.data.data.content),
        })
      }
    })
    this.index = 1
  },
  loadMore(callback) {
    if(!callback){
      callback=res=>{}
    }
    wx.showLoading({
      title: '正在玩命加载中',
    })
    if (this.data.list.length === 0) return
    var that = this
    that.setData({
      loading: true
    })
    wx.request({
      url: 'https://css.dgut.edu.cn/api/article/list/news?size=10&page='+this.index++,
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
         that.setData({
           loading: false,
           list: that.data.list.concat(res.data.data.content)
         },res=>{
          wx.hideLoading()
          callback();
         })
      }
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
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})