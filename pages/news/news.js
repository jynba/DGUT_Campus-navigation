
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    loading: false,
    plain: false,
    time:"",
    navItems: [{
      name: '学院要闻',
      index: 1
    }, {
      name: '通知公告',
      index: 2
    }, {
      name: '学生活动',
      index: 3
    }],
    tabCur: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.getPages('https://css.dgut.edu.cn/api/article/list/news?size=10');
  },

  //异步函数加载分栏
  tabSelect: async function (e) {
    let that = this;
    let tabCur = e.currentTarget.dataset.id
    switch (tabCur) {
      case 1: {
        that.setData({
          tabCur: e.currentTarget.dataset.id,
          list: [],
        })
        let url1 = 'https://css.dgut.edu.cn/api/article/list/news?size=10'
        await that.getPages(url1)
        break
      }
      case 2: {
        that.setData({
          list: [],
          tabCur: e.currentTarget.dataset.id,
        })
        let url2 = "https://css.dgut.edu.cn/api/article/list/notice?size=10"
        await that.getPages(url2)
        break
      }
      case 3: {
        that.setData({
          list: [],
          tabCur: e.currentTarget.dataset.id,
        })
        let url3 = "https://css.dgut.edu.cn/api/article/list/34"
        await that.getPages(url3)
        break
      }
    }
  },
  
  //获取官网数据
  getPages: async function (url) {
    wx.showLoading({
      title: '加载中...',
    })
    var that = this;
    wx.request({
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        for (let i = 0; i < res.data.data.content.length; i++) {
          res.data.data.content[i].createTime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data.data.content[i].createTime)
        }
        that.setData({
          list: [].concat(res.data.data.content),
        }, res => {
          wx.hideLoading()
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
        for(let i =0;i<res.data.data.content.length;i++){
          res.data.data.content[i].createTime=/\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data.data.content[i].createTime)
        }
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