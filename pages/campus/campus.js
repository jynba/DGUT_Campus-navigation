// pages/campus/campus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      // {
      //   id: 'view',
      //   name: '校园资讯',
      //   open: false,
      //   pages: []
      // },
      {
        id: 'contain',
        name: '学院要闻',
        open: true,
        pages: [],
      },
    ],
    lunbo: [{
        url: 'https://www.dgut.edu.cn/__local/8/F0/0D/E3B8DC3FFD79217E66BC14A4615_5490F1B0_17659.jpg'
      },
      {
        url: 'https://www.dgut.edu.cn/__local/5/84/9F/32E56C94F83273DA9DA983DD810_89F96A48_168CA.jpg'
      },
      {
        url: 'https://www.dgut.edu.cn/__local/6/47/EC/47E5E4D32DF40FA1FEA3ECF8416_59E70E45_1976C.jpg'
      },
      {
        url: 'https://www.dgut.edu.cn/__local/F/B7/D2/A88E9BEF7DCEF3386D69EEE2E6D_0D38FC72_1ABD4.jpg'
      }
    ]
  },
  navTo: function (e) {
    wx.navigateTo({
      url: '/pages/lights/lights'
    });
  },
  nav: function (e) {
    wx.navigateTo({
      url: '/pages/news/news'
    });
  },
  // kindToggle(e) {
  //   const id = e.currentTarget.id
  //   const list = this.data.list
  //   for (let i = 0, len = list.length; i < len; ++i) {
  //     if (list[i].id === id) {
  //       list[i].open = !list[i].open
  //     }
  //   }
  //   this.setData({
  //     list
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that = this
    wx.request({
      url: 'https://css.dgut.edu.cn/',
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        // console.log(res.data)
        var body = res.data.match(/<div class="el-tabs__content">([\s\S]+?)<script>/g)[0].replace(/<div.*?>/g, '')
          .replace(/<\/div>/g, '')
          .replace(/<span.*?>/g, '')
          .replace(/<\/span.*?>/g, '')
          .replace(/<script>/g, '')
        var content = body.match(/<a.*?>([\s\S]+?)<\/a>/g)

        // console.log(content);
        var list = that.data.list;
        for (let i = 0; i < 6; i++) {
          content[i] = content[i].match(/">([\s\S]+?)<\/a>/);
          content[i].time = /\d{4}-\d{1,2}-\d{1,2}/.exec(body)[0];
          var item = {
            art: content[i][1],
            time: content[i].time
          }
          list[0].pages = list[0].pages.concat(item);
        }
        // console.log(list);
        that.setData({
          list: list
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})