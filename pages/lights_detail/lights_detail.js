// pages/lights_detail/lights_detail.js
const app = getApp()
const db = wx.cloud.database(); //初始化数据库
const mylights = db.collection('lights')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist: [],
    name: "",
    describe: "",
    nickName: "",
    avatarUrl: "",
    _id: "",
    unlike: 'https://tdsxcx.dxjujia.com/img/index/index_03.png',
    like: 'https://tdsxcx.dxjujia.com/img/index/index_02.png',
    isFavorite: "",
    createTime:"",
    Candelete: false,
    openid:"",
    like_users:[],
    num : 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = wx.getStorageSync('data')
    //获取上个页面的缓存的数据
    for (let i = 0; i < data.productCon_r.length; i++) {
      if (options.id == data.productCon_r[i]._id) {
        let res = data.productCon_r[i];
        res.createTime = /\d{4}-\d{1,2}-\d{1,2}/g.
        exec(res.createTime)
        this.setData({
          name: res.name,
          imglist: res.imglist,
          describe: res.describe,
          nickName: res.nickName,
          like_users: res.like_users,
          num:res.like_users.length,
          avatarUrl: res.avatarUrl,
          _id: res._id,
          isFavorite: res.isFavorite,
          createTime: res.createTime,
          openid : res._openid
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
        //将时间变成年-月-日
        res.createTime = /\d{4}-\d{1,2}-\d{1,2}/g.
        exec(res.createTime)
        this.setData({
          name: res.name,
          imglist: res.imglist,
          describe: res.describe,
          nickName: res.nickName,
          like_users: res.like_users,
          num : res.like_users.length,
          avatarUrl: res.avatarUrl,
          _id: res._id,
          isFavorite: res.isFavorite,
          createTime: res.createTime,
          openid : res._openid
        })
        this.res = res;
        this.is = "left";
        this.index = i;
        break;
      }
    }
//直接在云数据库获取    
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

    var openid = wx.getStorageSync('openid')
    if(openid === this.data.openid){
      this.setData({
        Candelete : true
      })
    }
  },

  delete: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['删除'],
      success (res) {
        if(res.tapIndex===0){

          var pages = getCurrentPages();
          var prevPage = pages[pages.length - 2]; //上一个页面      
          //删除上个页面中的缓存中的这个数据 
          let data = wx.getStorageSync('data')
          if (that.is == "left") {
            var deletedata = data.productCon_l.splice(that.index,1);
            prevPage.setData({
              productCon_l: data.productCon_l,
            })
          }
          if (that.is == "right") {
            var deletedata = data.productCon_r.splice(that.index,1);
            prevPage.setData({
              productCon_r: data.productCon_r,
            })
          }
          wx.setStorageSync('data', data);

          //删除云数据库中的对应数据
          mylights.doc(that.data._id).remove().then(res => {
            wx.showToast({
              title: '删除成功',
              icon: 'success',
              duration: 1000,
              success: res2 => {
                console.log(res2);
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1,
                  })
                }, 1000)
              },
            })
          })
        }
        // else{
        //   wx.showToast({
        //     title: '暂未开发，敬请期待',
        //     icon: 'none',
        //     duration: 1000
        //   })
        // }
      },
      fail (res) {
      }
    })
  },

  islike: function () {
    var that = this
    let isFavorite = that.data.isFavorite;
    var num = that.data.like_users.length;
    that.setData({
      isFavorite: !isFavorite
    })
    let id = that.data._id;
    if (that.data.isFavorite) {
      that.data.like_users.length++;
      num++;
      that.setData({
        num:num
      })
      //更新数据库
      wx.cloud.callFunction({
        name: 'click_like',
        data: {
          doc: id,
          //向云函数传递字符串，在后端进行解析
          data: "{like_users : _.addToSet(OPENID)}",
          data2:"{like_nums : _.inc(1)}"
        }
      }).then((res) => {
        console.log(res)
      })
    } else {
      that.data.like_users.length--;
      num--;
      that.setData({
        num:num
      })
      wx.cloud.callFunction({
        name: 'click_like',
        data: {
          doc: id,
          //向云函数传递字符串，在后端进行解析
          data: "{like_users : _.pop(OPENID)}",
          data2:"{like_nums : _.inc(-1)}"
        }
      }).then((res) => {
        console.log(res)
      })
    }

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    
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
    wx.setStorageSync('data', data);
  },
  enlarge: function (e) {
    var current = e.currentTarget.dataset.src;
    wx.previewImage({
      urls: this.data.imglist, //需要预览的图片http链接列表，注意是数组
      current: current, // 当前显示图片的http链接，默认是第一个
      success: function (res) {
      },
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

    //替换修改的值

    // console.log(prevPage)
    // prevPage.setData({
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