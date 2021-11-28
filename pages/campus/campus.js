// pages/campus/campus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [{
        id: 'view',
        name: '校园资讯',
        open: false,
        pages: [{
          page: '活力机关：机关第七届三人篮球赛圆满落幕 ',
          id: '2',
          time: ' 2021-11-19'
        }, {
          page: '我校学子在全国大学生数学竞赛中创史上最佳  ',
          id: '793',
          time: '  2021-11-19'
        }, {
          page: '我校在2021年全国大学生电子设计竞赛广东赛区获9项一等奖 ',
          id: '791',
          time: ' 2021-11-18'
        }, {
          page: '【中青班快讯】感悟人民情怀强化宗旨意识  ',
          id: '790',
          time: ' 2021-11-16'
        }, {
          page: '【中青班快讯】党校中青班组织开展校园文化活动的策划艺术专题培训 ',
          id: '785',
          time: ' 2021-11-16'
        }, ]
      },
      {
        id: 'contain',
        name: '通知公告',
        open: true,
        pages: [ {
          page: '网安学院召开期中教学工作师生座谈会',
          id: '1',
          time: '2021-11-19'
        },{
          page: '关于2022年度“攀登计划”专项资金项目申报通知',
          id: '794',
          time: '2021-11-23'
        }, {
          page: '网安学院党委赴广州开展企业调研活动',
          id: '791',
          time: '2021-11-23'
        }, {
          page: '弘扬军人精神，坚持优良作风——网安学院退役军人座谈会 ',
          id: '790',
          time: '2021-11-16'
        }, {
          page: '东莞市首席信息官协会走访网安学院 ',
          id: '785',
          time: '2021-11-16'
        }],
      },
    ],
    lunbo: [{
        url: 'https://www.dgut.edu.cn/__local/8/F0/0D/E3B8DC3FFD79217E66BC14A4615_5490F1B0_17659.jpg'
      },
      {
        url: 'https://www.dgut.edu.cn/__local/5/84/9F/32E56C94F83273DA9DA983DD810_89F96A48_168CA.jpg'
      },
      {
        url: 'https://www.dgut.edu.cn/__local/6/47/EC/47E5E4D32DF40FA1FEA3ECF8416_59E70E45_1976C.jpg'
      },
      {
        url: 'https://www.dgut.edu.cn/__local/F/B7/D2/A88E9BEF7DCEF3386D69EEE2E6D_0D38FC72_1ABD4.jpg'
      }
    ]
  },
  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
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