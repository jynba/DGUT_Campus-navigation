// pages/fb/fb.js
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
    submit:false,
    _id:"",
    userInfo: "",
    nickName:"",
    avatarUrl:"",
    like_nums:0,
  },

  onLoad:function(){
    var userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo: userInfo,
      nickName: userInfo.nickName,
      avatarUrl: userInfo.avatarUrl,
    })
  },
  onUnload: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2]; //上一个页面
    //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
    if(this.data.submit){
      console.log(prevPage.data)
      prevPage.setData({
        lastdata: [this.data,...prevPage.data.lastdata],
        productCon_l:[],
        productCon_r:[],
      })
      prevPage.concatData(prevPage.data.lastdata)
      prevPage.concatData(prevPage.data.allLights)
      prevPage.pageData.skip=prevPage.pageData.skip+1;
      prevPage.data.showinfo=2;
    }
  },
  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imglist = this.data.imglist;
    imglist.splice(index, 1)
    that.setData({
      imglist: imglist
    });
  },
  // 选择图片 &&&
  addpic: function (e) {
    return new Promise(resolve => {
      var imglist = this.data.imglist;
      var that = this;
      var n = 5;
      if (5 > imglist.length > 0) {
        n = 5 - imglist.length;
      } else if (imglist.length == 5) {
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
          } else if (5 > imglist.length) {
            imglist = imglist.concat(tempFilePaths);
          }
          that.setData({
            imglist: imglist
          });
          return resolve();
        }
      })
    });
  },

  //发布按钮
  upload: function (callback) {
    this.addpic().then(
      res => {
        if (this.data.imglist.length) {
          //上传图片到云存储
          wx.showLoading({
            title: '上传中',
          })
          let promiseArr = [];
          for (let i = 0; i < this.data.imglist.length; i++) {
            promiseArr.push(new Promise((reslove, reject) => {
              let item = this.data.imglist[i];
              let suffix = /\.\w+$/.exec(item)[0]; //正则表达式返回文件的扩展名
              wx.cloud.uploadFile({
                cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
                filePath: item, // 小程序临时文件路径
                success: res => {
                  this.setData({
                    fileIDs: this.data.fileIDs.concat(res.fileID)
                  });
                  reslove();
                  wx.hideLoading();
                  wx.showToast({
                    title: "上传成功",
                  })
                },
                fail: res => {
                  wx.hideLoading();
                  wx.showToast({
                    title: "上传失败",
                  })
                }
              })
            }));
          }
        }
      }
    )

  },

  onSubmit: function (e) {
    this.data.submit=true;
    var that = this;
    // console.log(that.data.imglist)//本地文件路径
    // console.log(that.data.fileIDs)//云数据库路径
    if (that.data.fileIDs.length===0) {
      wx.showToast({
        title: '请上传图片后再提交',
        icon:"none",
      })
    } else {
      this.setData({
        name: e.detail.value.name,
        imglist: that.data.fileIDs,
        describe: e.detail.value.describe,
        createTime: db.serverDate()
      })
      lights.add({
        data: {
          name: e.detail.value.name,
          imglist: that.data.fileIDs,
          describe: e.detail.value.describe,
          createTime: db.serverDate(),
          nickName: that.data.userInfo.nickName,
          avatarUrl: that.data.userInfo.avatarUrl,
          like_nums:0
        }
      }).then(res => {
        that.data._id=res._id;
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
})