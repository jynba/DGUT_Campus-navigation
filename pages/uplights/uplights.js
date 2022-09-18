// pages/fb/fb.js
var utils = require('../../utils/util.js')
const app = getApp()
const db = wx.cloud.database(); //初始化数据库
const lights = db.collection('lights')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imglist: [], //选择图片
    fileIDs: [], //上传云存储后的返回值
    name: "",
    describe: "",
    submit: false,
    _id: "",
    userInfo: "",
    nickName: "",
    avatarUrl: "",
    like_nums: 0,
    _openid: ""
  },

  onLoad: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if(userInfo.length == 0)
    {
      wx.getUserProfile({
        desc: '用于小程序的登录功能',
        success: res=>{
          wx.setStorageSync('userInfo', res)
        }
      })
    }
    this.setData({
      userInfo: userInfo,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
    })
  },
  onUnload: function () {
    //返回页面时再上传时间
    const now = new Date();
    var createtime = utils.formatTime(now)
    this.setData({
      createTime: createtime,
      like_users: [], //记录点赞的用户
    })

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    if (this.data.submit) {
      console.log(prevPage.data)
      prevPage.setData({
        lastdata: [this.data, ...prevPage.data.lastdata],
        productCon_l: [],
        productCon_r: [],
      })
      prevPage.concatData(prevPage.data.lastdata)
      prevPage.concatData(prevPage.data.allLights)
      prevPage.pageData.skip = prevPage.pageData.skip + 1;
      prevPage.data.showinfo = 2;
    }
  },

  // 选择图片 &&&
  addpic: function (e) {
    return new Promise(resolve => {
      var imglist = this.data.imglist;
      var that = this;
      var n = 9;
      if (9 > imglist.length > 0) {
        n = 9 - imglist.length;
      } else if (imglist.length == 9) {
        n = 1;
      }
      wx.chooseImage({
        count: n, // 默认9，设置图片张数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // console.log(res.tempFilePaths)
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
          if (imglist.length == 0) {
            imglist = tempFilePaths
          } else if (9 > imglist.length) {
            imglist = imglist.concat(tempFilePaths);
          }
          var successUp = 0; //成功
          var failUp = 0; //失败
          var length = tempFilePaths.length; //总数
          var count = 0; //第几张
          //上传到云存储
          that.uploadOneByOne(tempFilePaths, successUp, failUp, count, length);
          //本地数据更新
          that.setData({
            imglist: imglist
          });
          return resolve();
        }
      })
    });
  },

  //递归上传；防止异步导致顺序出错
  uploadOneByOne(imgPaths, successUp, failUp, count, length) {
    let that = this;
    let item = imgPaths[count];
    let suffix = /\.\w+$/.exec(item)[0]; //正则表达式返回文件的扩展名
    wx.showLoading({
      title: '上传中',
    })
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
      filePath: item, // 小程序临时文件路径
      success: res => {
        successUp++; //成功+1
        //更新本地路径为云存储路径
        imgPaths[count] = res.fileID;
      },
      fail: res => {
        failUp++; //失败+1
        wx.showToast({
          title: '第' + failUp + '张' + "上传失败",
          icon: 'none',
          duration: 2000
        })
      },
      complete: function (e) {
        count++; //下一张
        if (count == length) {
          //上传完毕，作一下提示
          that.setData({
            fileIDs: that.data.fileIDs.concat(imgPaths)
          }, res => {
            wx.hideLoading();
            wx.showToast({
              title: '上传成功',
              icon: 'success'
            })
          });
        } else {
          //递归调用，上传下一张
          that.uploadOneByOne(imgPaths, successUp, failUp, count, length);
        }
      }
    })
  },

  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imglist = this.data.imglist;
    let imgPath = this.data.fileIDs;
    imglist.splice(index, 1);
    imgPath.splice(index, 1)
    that.setData({
      imglist: imglist,
      fileIDs: imgPath,
    });
  },

  //发布按钮
  onSubmit: function (e) {
    var that = this;
    that.data.submit = true;
    if (that.data.imglist.length === 0) {
      wx.showToast({
        title: '请上传图片后再提交',
        icon: "none",
      })
    }else if(that.data.imglist.length != that.data.fileIDs.length){
      wx.showToast({
        title: '等待图片上传完后再提交',
        icon: "none",
      })
    }else {
      var openid = wx.getStorageSync('openid')
      that.setData({
        name: e.detail.value.name,
        imglist: that.data.fileIDs,
        describe: e.detail.value.describe,
        _openid: openid,
      })
      lights.add({
        data: {
          name: e.detail.value.name,
          imglist: that.data.fileIDs,
          describe: e.detail.value.describe,
          createTime: db.serverDate(),
          nickName: that.data.userInfo.nickName,
          avatarUrl: that.data.userInfo.avatarUrl,
          like_users: [], //记录点赞的用户
          like_nums: 0,
        }
      }).then(res => {
        that.data._id = res._id;
        wx.hideLoading();
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 1000,
          success: res2 => {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1000)
          },
        })
      })
    }
  },
  preViewimg: function (e) {
    let index = e.target.dataset.index; //预览图片的编号
    let that = this;
    wx.previewImage({
      current: that.data.imglist[index], //预览图片链接
      urls: that.data.imglist, //图片预览list列表
      success: function (res) {
        //console.log(res);
      },
      fail: function () {
        //console.log('fail')
      }
    })
  },
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
  },
})