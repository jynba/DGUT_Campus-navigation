// pages/help/help.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        Q: "1.如何使用导航功能？",
        content: '在“松山湖地图”中选择要前往的地点，路线规划中点击“开始导航”，选择调用高德地图or腾讯地图，根据个人出行方式选择“驾车”or“步行”等开始导航。',
        show:false,
      }, {
        Q: "2.如何上传自定义坐标？",
        content: "“我的”-“管理员模式”-“点击获取当前坐标经纬度”-“输入地点名称”（可记录描述地点的话和上传图片让地点信息更详细）-“上传并生成maker”即可，后可在“松山湖地图”的“私人定制”查看该坐标。",
      },
      {
        Q: "3.如何分享校园美景？",
          content: "“校园风光”-“more”-“上传作品”-“文字记录、上传图片（5张以内）”-“提交”，后在“最近更新”页面展示你的作品，优秀的作品或许能得到不少同学的点赞支持！",
        show:false,
      },
      {
        Q: "4.怎么退出登录？",
        content: "小程序没有登录你的微信，“我的”界面只是展示了你的用户名和头像。",
        show:false,
      }, {
        Q: "5.如何反馈意见与建议？",
        content: "可在“我的”-“关于我们”添加开发者微信进行交流探讨，或通过“客服消息”反馈你宝贵的意见！",
        show:false,
      }
    ]
  },

  listTap(e) {
    let Index = e.currentTarget.dataset.parentindex, //获取点击的下标值
    list = this.data.list;
    for(let i =0;i<list.length;i++){
      if(i==Index){
        list[i].show=!list[i].show;
        this.setData({
          list:list
        })
        console.log(list[i])
        break;
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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