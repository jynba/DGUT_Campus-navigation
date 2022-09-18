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
    hotItems: ["最近更新", "点赞最多", "我的作品"],
    hotCur: 0,
    orderBy: "createTime",
    haschange: false,
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

    //数据刷新
    that.setData({
      hotCur: hotCur,
      orderBy: orderBy,
      productCon_l: [],
      productCon_r: [],
      allLights: [],
    })
    that.pageData.skip = 0;
    that.data.showinfo = 6;

    //如果不是我的作品的话
    if (!order) {
      that.getData(res => {
        that.concatData(that.data.lights)
      }, that.data.orderBy);
    }
     else { //如果是我的作品的话，调用云函数
      var openid = wx.getStorageSync('openid')
      wx.showLoading({
        title: '正在玩命加载中',
      })
      wx.cloud.callFunction({
        name: "Mylights"
      }).then(res => {
    //渲染当前用户的所有点赞状态
    for (let i = 0; i < res.result.data.length; i++) {
      //查看是否点过赞
      for (let n = 0; n < res.result.data[i].like_users.length; n++) {
        if (openid === res.result.data[i].like_users[n]) {
          res.result.data[i].isFavorite = true;
          break;
        } else {
          res.result.data[i].isFavorite = false;
        }
      }
    }
        that.setData({
          lights: [...that.data.lights, ...res.result.data],
          allLights: [...that.data.allLights, ...res.result.data],
          isEndOfList: true
        }, res => {
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
    var openid = wx.getStorageSync('openid')
    mylights.orderBy(orderby, 'desc') //按创建时间的最新开始排列(降序)
      .skip(this.pageData.skip)
      .limit(that.data.showinfo)
      .get()
      .then(res => {
        //渲染当前用户的所有点赞状态
        for (let i = 0; i < res.data.length; i++) {
          //查看是否点过赞
          for (let n = 0; n < res.data[i].like_users.length; n++) {
            if (openid === res.data[i].like_users[n]) {
              res.data[i].isFavorite = true;
              break;
            } else {
              res.data[i].isFavorite = false;
            }
          }
        }
//数据传到本地
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

  localData: function () {
    var data = wx.getStorageSync('data');

  },

  pageData: {
    skip: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //识别当前进入的用户
    //（若没在用户集合中，则添加到其中）从用户集合中获取当前用户的已点赞数据

    //记录：从用户点赞集合中筛选当前记录出现的次数
    //从已点赞数据中判断是否已经点过赞，渲染到记录上

    //初始化每条记录的点赞数

    // var lights = this.data.lights.slice(0) //必须深拷贝
    this.getData(res => {
      this.concatData(this.data.lights)
    }, this.data.orderBy);

  },

  onShow: function (e) {
    //用于刷新页面
    if (this.data.haschange) {
      that.setData({
        hotCur: hotCur,
        orderBy: orderBy,
        productCon_l: [],
        productCon_r: [],
        allLights: [],
        haschange: false, //重新设置为false
      })
      that.pageData.skip = 0;
      that.data.showinfo = 6;
      this.getData(res => {
        this.concatData(this.data.lights)
      }, this.data.orderBy)
    }

  },

  concatData(data) {
    let concatBool = this.data.concatBool || true;
    if (!concatBool) return false;
    if (timer) clearTimeout(timer)
    concatBool = false;
    var timer = setTimeout(() => {
      let productCon = [];
      let mydata = data
      productCon = data.shift()//从前抛出
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
    var openid = wx.getStorageSync('openid')
    for (let j = 0; j < productCon_l.length; j++) {
      if (id == productCon_l[j]._id) {
        productCon_l[j].isFavorite = !productCon_l[j].isFavorite;
        if (productCon_l[j].isFavorite) {
          productCon_l[j].like_users.length++;
          //更新数据库
          wx.cloud.callFunction({
            name: 'click_like',
            data: {
              doc: id,
              //向云函数传递字符串，在后端进行解析
              data: "{like_nums : _.inc(1),like_users : _.addToSet(OPENID)}",
            }
          }).then((res) => {
            console.log(res)
          })
        } else {
          //当前
          productCon_l[j].like_users.length--;
          //更新数据库
          wx.cloud.callFunction({
            name: 'click_like',
            data: {
              doc: id,
              //向云函数传递字符串，在后端进行解析
              data: "{like_nums : _.inc(-1),like_users : _.pop(OPENID)}",
            }
          }).then((res) => {
            console.log(res)
          })
        }
        this.setData({
          productCon_l: productCon_l
        })
        let data = this.data;
        wx.setStorageSync('data', data)//将每次点赞都先保存在缓存
        break;
      }
    }
    for (let j = 0; j < productCon_r.length; j++) {
      if (id == productCon_r[j]._id) {
        productCon_r[j].isFavorite = !productCon_r[j].isFavorite;
        if (productCon_r[j].isFavorite) {
          productCon_r[j].like_users.length++;
          //更新数据库
          wx.cloud.callFunction({
            name: 'click_like',
            data: {
              doc: id,
              //向云函数传递字符串，在后端进行解析
              data: "{like_nums : _.inc(1),like_users : _.addToSet(OPENID)}"
            }
          }).then((res) => {
            console.log(res)
          })
        } else {
          productCon_r[j].like_users.length--;
          wx.cloud.callFunction({
            name: 'click_like',
            data: {
              doc: id,
              //向云函数传递字符串，在后端进行解析
              data: "{like_nums : _.inc(-1),like_users : _.pop(OPENID)}"
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