var app = getApp();
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl:"",
    userInfo:"",
    id:""
  },
  onLoad: function () {
  },
  // 请求API授权，获得用户头像和昵称
  getUserProfile(e) {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo.nickName,
          result: "ok",
        })
        app.globalData.userInfo=res.userInfo.nickName;
        app.globalData.avatarUrl=res.userInfo.avatarUrl;
      },
      fail: function (err) {
        console.log("获取失败: ", err)
      }
    })
  },
  navTo: function(e) {
    wx.navigateTo({
      url: '/pages/mode/mode'
    });
  }
})