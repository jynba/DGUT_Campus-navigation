// pages/lights/lights.js
let leftHeight = 0,
  rightHeight = 0; //分别定义左右两边的高度
let query;
const app = getApp();
const db = wx.cloud.database(); //初始化数据库
const mylights = db.collection('lights')
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productCon_l: [],
    productCon_r: [],
    unlike: 'https://tdsxcx.dxjujia.com/img/index/index_03.png',
    like: 'https://tdsxcx.dxjujia.com/img/index/index_02.png',
    PageCount: 0,
    lights: [],
    lastdata: [],
    isEndOfList: false,
    showinfo: 6,
    allLights: [],
    avatarUrl: "",
    nickName: "",
    like_nums: 0,
    hotItems: ["最近更新", "点赞最多", "我的作品"],
    hotCur: 0,
    orderBy: "createTime"
  },

  hotSelect: async function (e) {
    let that = this
    let hotCur = e.currentTarget.dataset.id
    let orderBy = "createTime"
    switch (hotCur) {
      //最近更新
      case 0: {
        orderBy = "createTime"
        break;
      }
      //点赞最多
      case 1: {
        orderBy = "like_nums"
        break
      }
      //我的作品
      case 2: {
        var order = true;
        break
      }
    }
    that.setData({
      hotCur: hotCur,
      orderBy: orderBy,
      productCon_l: [],
      productCon_r: [],
      allLights:[],
    })
    that.pageData.skip = 0;
    that.data.showinfo = 6;
    
    if(!order){
      await that.getData(res => {
        that.concatData(that.data.lights)
      }, that.data.orderBy);
    }else{
      wx.showLoading({
        title: '正在玩命加载中',
      })
      wx.cloud.callFunction({
        name: "Mylights"
      }).then(res => {
        that.setData({
          lights: [...that.data.lights, ...res.result.data],
          allLights: [...that.data.allLights, ...res.result.data],
          isEndOfList:true
        },res=>{
          that.concatData(that.data.lights);
          wx.hideLoading()
        })
      })
    }
  },


  getData: function (callback, orderby) {
    if (!callback) {
      callback = res => {}
    } //使得没传参是被允许的
    wx.showLoading({
      title: '正在玩命加载中',
    })
    //一次显示6条数据；分页显示

    // console.log(this.pageData.skip)
    var that = this;
    mylights.orderBy(orderby, 'desc') //按创建时间的最新开始排列
      .skip(this.pageData.skip)
      .limit(that.data.showinfo)
      .get()
      .then(res => {
        that.setData({
          allLights: [...that.data.allLights, ...res.data],
          lights: [...that.data.lights, ...res.data],
          isEndOfList: res.data.length < that.data.showinfo ? true : false //判断是否结束
        }, res2 => {
          this.pageData.skip = this.pageData.skip + that.data.showinfo;
          console.log(this.pageData.skip)
          wx.hideLoading()
          callback();
        })
      })
  },

  localData:function(){
    var data = wx.getStorageSync('data');

  },
  pageData: {
    skip: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name:"deletelights"
    // }).then(res=>{
    //   console.log(res)
    //   wx.showToast({
    //     title: '删除成功',
    //     icon:'success',
    //     // success:res2=>{
    //     //   console.log(res2)
    //     // },
    //   })
    // })

    // var lights = this.data.lights.slice(0) //必须深拷贝
    this.getData(res => {
      this.concatData(this.data.lights)
    }, this.data.orderBy);
    
  },

  onShow: function (e) {
    // if (!this.data.hasonload) {
    // console.log(this.data.lastdata)
    // this.concatData(this.data.lastdata)
    //全部放在uplights页面处理

    // var pages = getCurrentPages();
    // var prevPage = pages[pages.length - 2]; //上一个页面
    // //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    // console.log(prevPage)
  },

  concatData(data) {
    let concatBool = this.data.concatBool || true;
    if (!concatBool) return false;
    if (timer) clearTimeout(timer)
    concatBool = false;
    var timer = setTimeout(() => {
      let productCon = [];
      let mydata = data
      productCon = data.shift()
      let left_h = 0;
      let right_h = 0;
      let productCon_l = this.data.productCon_l || [];
      let productCon_r = this.data.productCon_r || [];
      const query = wx.createSelectorQuery().in(this)
      query.select('#pro_l').boundingClientRect()
      query.select('#pro_r').boundingClientRect()
      query.exec((res) => {
        left_h = res[0].height
        right_h = res[1].height
        // console.log(`left_h:${left_h}, right_h:${right_h}`)
        if (productCon) {
          if (left_h <= right_h) {
            productCon_l.push(productCon)
          }
          if (left_h > right_h) {
            productCon_r.push(productCon)
          }
          this.setData({
            productCon_l,
            productCon_r,
            concatBool: true
          }, this.concatData(mydata))
          let data = this.data;
          wx.setStorageSync('data', data)
        } else {
          return false
        }
      })
    }, 50)
  },

  isEmpty: function (a) {
    if (a === "") return true; //检验空字符串
    if (a === "null") return true; //检验字符串类型的null
    if (a === "undefined") return true; //检验字符串类型的 undefined
    if (!a && a !== 0 && a !== "") return true; //检验 undefined 和 null           
    if (Array.prototype.isPrototypeOf(a) && a.length === 0) return true; //检验空数组
    if (Object.prototype.isPrototypeOf(a) && Object.keys(a).length === 0) return true; //检验空对象
    return false;
  },

  submit: function (e) {
    //获取缓存用户信息
    try {
      var userInfo = wx.getStorageSync('userInfo');
    } catch (e) {
      console.log(e)
    }
    //判断空对象
    if (!userInfo) {
      wx.getUserProfile({
        desc: '用于完善上传作品信息',
        success: (res) => {
          //用户信息存入缓存
          app.globalData.userInfo = res.userInfo;
          app.globalData.hasInfo = true;
          wx.setStorageSync("userInfo", res.userInfo)
          wx.navigateTo({
            url: '../uplights/uplights',
          })
        }
      })
    } else {
      wx.navigateTo({
        url: '../uplights/uplights',
      })
    }
  },
  islike: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.favoriteid;
    var productCon_l = that.data.productCon_l;
    var productCon_r = that.data.productCon_r;
    for (let j = 0; j < productCon_l.length; j++) {
      if (id == productCon_l[j]._id) {
        productCon_l[j].isFavorite = !productCon_l[j].isFavorite;
        if (productCon_l[j].isFavorite) {
          productCon_l[j].like_nums++;
          //更新数据库
          wx.cloud.callFunction({
            name: 'click_like',
            data: {
              doc: id,
              //向云函数传递字符串，在后端进行解析
              data: "{like_nums : _.inc(1)}",

            }
          }).then((res) => {
            console.log(res)
          })
        } else {
          productCon_l[j].like_nums--;
          wx.cloud.callFunction({
            name: 'click_like',
            data: {
              doc: id,
              //向云函数传递字符串，在后端进行解析
              data: "{like_nums : _.inc(-1)}",
            }
          }).then((res) => {
            console.log(res)
          })
        }
        this.setData({
          productCon_l: productCon_l
        })
        let data = this.data;
        wx.setStorageSync('data', data)
        break;
      }
    }
    for (let j = 0; j < productCon_r.length; j++) {
      if (id == productCon_r[j]._id) {
        productCon_r[j].isFavorite = !productCon_r[j].isFavorite;
        if (productCon_r[j].isFavorite) {
          productCon_r[j].like_nums++;
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
          productCon_r[j].like_nums--;
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
        this.setData({
          productCon_r: productCon_r
        })
        let data = this.data;
        wx.setStorageSync('data', data)
        break;
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    let data = this.data;
    wx.setStorageSync('data', data)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // this.pageData.skip=0;
    // this.setData({lights:[]});
    // this.getData(res=>{
    //   wx.stopPullDownRefresh();
    // });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.showinfo = 2; //触底后一次获取两个，太多会出现异常
    this.data.isEndOfList || this.getData(res => {
      this.concatData(this.data.lights)
    }, this.data.orderBy);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})