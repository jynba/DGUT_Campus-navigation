var app = getApp();
Page({
  data: {
    id: "",
    Imglist:[
      "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXsrAqcgjc2PiaVgKdpvkGVcUDgQdvrIsHTaVD414IBPFPibDX6PG3lqYo4p097wp6dLLEnStQT1S5SdA/0?wx_fmt=png",
      "https://mmbiz.qpic.cn/mmbiz_jpg/ymce5HAJXsrAqcgjc2PiaVgKdpvkGVcUDuzCGPHQSqlRibUYeicNYDLB4lPVwnuL2HJz2nyoJqicd4y19IByFGl8Ww/0?wx_fmt=jpeg"
    ],
  },
  clickImg: function(e){
    wx.previewImage({
      urls: this.data.Imglist,
    })
  },
  // handleContact(e) {
  //   console.log(e.detail.path)
  //   console.log(e.detail.query)
  // },

  onLoad: function () {},

  onShareAppMessage: function (res) {
    return {
      title: '莞工地图',
      path: 'pages/home/home', // 显示的页面
      imageUrl: "https://img1.027art.cn/img/2020/03/1583870337801574.jpg",
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res);
      }
    }
  },
  navTo1: function (e) {
    wx.navigateTo({
      url: '/pages/mode/mode'
    });
  },
  navTo2: function (e) {
    wx.navigateTo({
      url: '/pages/help/help'
    });
  },
  navTo3: function (e) {
    wx.navigateTo({
      url: '/pages/about/about'
    });
  },
})