// pages/lights_detail/lights_detail.js
const app = getApp()
const db = wx.cloud.database(); //初始化数据库
const mylights = db.collection('allLights')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: [],
    name: "",
    describe: "",
    nickName: "",
    like_nums: 0,
    avatarUrl: "",
    _id: "",
    unlike: 'https://tdsxcx.dxjujia.com/img/index/index_03.png',
    like: 'https://tdsxcx.dxjujia.com/img/index/index_02.png',
    isFavorite: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = wx.getStorageSync('data')
    for (let i = 0; i < data.productCon_r.length; i++) {
      if (options.id == data.productCon_r[i]._id) {
        let res = data.productCon_r[i];
        this.setData({
          name: res.name,
          imglist: res.imglist,
          describe: res.describe,
          nickName: res.nickName,
          like_nums: res.like_nums,
          avatarUrl: res.avatarUrl,
          _id: res._id,
          isFavorite: res.isFavorite
        })
        this.res = res;
        this.is = "right";
        this.index = i;
        break;
      }
    }
    for (let i = 0; i < data.productCon_l.length; i++) {
      if (options.id == data.productCon_l[i]._id) {
        let res = data.productCon_l[i];
        this.setData({
          name: res.name,
          imglist: res.imglist,
          describe: res.describe,
          nickName: res.nickName,
          like_nums: res.like_nums,
          avatarUrl: res.avatarUrl,
          _id: res._id,
          isFavorite: res.isFavorite
        })
        this.res = res;
        this.is = "left";
        this.index = i;
        break;
      }
    }
    // mylights.doc(options.id).get().then(res=>{
    //   //拿到res=option.id后用setData渲染到界面
    //   this.setData({
    //     name: res.data.name,
    //     imglist:res.data.imglist,
    //     describe: res.data.describe,
    //     nickName:res.data.nickName,
    //     like_nums:res.data.like_nums,
    //     avatarUrl:res.data.avatarUrl,
    //     _id:res.data._id
    //   })
    // })
  },
  islike: function () {
    var that = this
    let isFavorite = that.data.isFavorite;
    that.setData({
      isFavorite: !isFavorite
    })
    let id = that.data._id;
    let nums = that.data.like_nums;
    if (that.data.isFavorite) {
      nums++;
      that.setData({
        like_nums: nums
      })
      //更新数据库
      wx.cloud.callFunction({
        name: 'click_like',
        data: {
          doc: id,
          //向云函数传递字符串，在后端进行解析
          data: "{like_nums : _.inc(1)}"
        }
      }).then((res) => {
        console.log(res)
      })
    } else {
      nums--;
      that.setData({
        like_nums: nums
      })
      wx.cloud.callFunction({
        name: 'click_like',
        data: {
          doc: id,
          //向云函数传递字符串，在后端进行解析
          data: "{like_nums : _.inc(-1)}"
        }
      }).then((res) => {
        console.log(res)
      })
    }
    let data = wx.getStorageSync('data')
    if (this.is == "left") {
      data.productCon_l[this.index] = this.data
    }
    if (this.is == "right") {
      data.productCon_r[this.index] = this.data
    }
    wx.setStorageSync('data', data);
  },
  enlarge: function (e) {
    wx.previewImage({
      urls: this.data.imglist, //需要预览的图片http链接列表，注意是数组
      current: '', // 当前显示图片的http链接，默认是第一个
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
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
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // console.log("1返回") 
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //替换修改的值
    let data = wx.getStorageSync('data')
    if (this.is == "left") {
      data.productCon_l[this.index] = this.data
      prevPage.setData({
        productCon_l: data.productCon_l,
      })
    }
    if (this.is == "right") {
      data.productCon_r[this.index] = this.data
      prevPage.setData({
        productCon_r: data.productCon_r,
      })
    }
    // console.log(prevPage)
    // prevPage.setData({
    //   lastdata: [this.data,...prevPage.data.lastdata],
    //   productCon_l:[],
    //   productCon_r:[],
    // })
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