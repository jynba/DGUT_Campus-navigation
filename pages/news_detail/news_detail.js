// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    art: {},
    img: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://css.dgut.edu.cn/api/article/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        if (res.data.data!=null) {
          var body = res.data.data.articleContent;
          var hasimg = /<img.*?>/.test(body);
          if (hasimg) {
            var img = body.match(/(http:|https:).*?\.(jpg|jpeg|gif|png)/);
            that.setData({
              img: img[0]
            })
          }
          body = body.replace(/<p.*?>/g, '')
            .replace(/<\/p>/g, '')
            .replace(/<span.*?>/g, '')
            .replace(/<\/span>/g, '')
            .replace(/<img.*?>/g, '')
            .replace(/<\/img>/g, '')
            .replace(/<a.*?>/g, '')
            .replace(/<\/a>/g, '')
            .replace(/<br>/g, '')
            .replace(/<br\/>/g, '')
            .replace(/&nbsp;/g, '')
          res.data.data.articleContent = body;
          // str = body;
          // console.log(pattern.test(str));
          // console.log(res.data.data)
          that.setData({
            art: res.data.data,
          })
        }

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})