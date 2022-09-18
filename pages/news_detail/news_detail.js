// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    art: {},
    img: "",
    imglist: {}
  },
  onPageScroll: function (e) {
    if (e.scrollTop > 150) {
      this.setData({
        hiddentop: true
      });
    } else {
      this.setData({
        hiddentop: false
      });
    }
  },

  //回到顶部函数
  goTop: function (e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },
  enlarge: function (e) {
    wx.previewImage({
      urls: [this.data.img], //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var that = this;
    wx.request({
      url: 'https://css.dgut.edu.cn/' + options.id,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        // console.log(res.data);
        var title = res.data.match(/<div class="cms-article-title">([\s\S]+?)<\/div>/g);
        console.log(title);
        var body = res.data.match(/<div id="article".*?>([\s\S]+?)<\/form>/g)[0];
        if (body != null) {
          // var hasimg = /<img.*?>/.test(body);
          // if (hasimg) {
          // var imgReg = /(http:|https:).*?\.(jpg|jpeg|gif|png)/gi;
          var link = body.match(/<img.*src="([^"]*)/ig);
          console.log(link);
          if (link) {
            for (let i = 0; i < link.length; i++) {
              var patt = /<img.*src="([^"]*)"/.exec(link[i])[1];
              var li = 'https://css.dgut.edu.cn' + patt;
              body = body.replace(/<img.*?[^enlarge]">/i, '<img src="' + li + '" style="max-width:100%;height:auto;display:block" class="art-img" bindtap="enlarge">')
            }
          }
          //将其转换为wxml标签，方便用rich-text渲染出来
          body = body.replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/<script>+.*/, '')
            .replace(/<script>+.*/, '')
          var item = {
            articleContent: body,
            articleView: title,
          }
          res.data = item;
          // str = body;
          // console.log(pattern.test(str));
          that.setData({
            art: res.data,
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