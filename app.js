// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData: {
    map: [
      {
        "name": "私人定制",
        "scale": 16,
        "data": []
      },
      {
        "name": "学习",
        "scale": 16,
        "data": [{
            latitude: 22.9002,
            longitude: 113.876225,
            name: '松山湖图书馆',
            address: '广东省东莞市大学路1号东莞理工学院松山湖校区内',image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.900779,
            longitude: 113.877481,
            name: '6栋教学楼',
            address: '广东省东莞市东一路与南二路交叉口西北100米',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.905803,
            longitude: 113.876963,
            name: '马克思主义学院',
            address: '东莞理工学院马克思主义学院',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.904351,
            longitude: 113.877051,
            name: '教育学院',
            address: '东莞理工学院教育学院',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.906022,
            longitude: 113.872831,
            name: '体育学院',
            address: '东莞理工学院体育学院',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.903421,
            longitude: 113.87817,
            name: '文学与传媒学院',
            address: '东莞理工学院文学与传媒学院',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.90406,
            longitude: 113.874165,
            name: '机械工程学院',
            address: '东莞理工学院机械工程学院',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.90254,
            longitude: 113.873987,
            name: '环建学院',
            address: '东莞理工学院环建学院',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.899887,
            longitude: 113.875103,
            name: '杨振宁教研楼',
            address: '东莞理工学院杨振宁教研楼',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.902001,
            longitude: 113.878261,
            name: '计算机与网络安全学院',
            address: '东莞理工学院计算机学院',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          }
        ]
      },
      {
        "name": "吃饭",
        "scale": 16,
        "data": [{
            latitude: 22.907011,
            longitude: 113.87752,
            name: '第三食堂',
            address: '东莞理工学院第三食堂',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.905844,
            longitude: 113.875731,
            name: '第一食堂',
            address: '东莞理工学院第一食堂',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.904865,
            longitude: 113.873441,
            name: '第二食堂',
            address: '东莞理工学院第二食堂',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          }
        ]
      },
      {
        "scale": 16,
        "name": "运动",
        "data": [{
            latitude: 22.906021,
            longitude: 113.87283,
            name: '松山湖体育馆',
            address: '广东省东莞市北一路与西一路交叉口西北方向130米',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.905313,
            longitude: 113.870954,
            name: '网球场',
            address: '东莞理工学院网球场',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.906021,
            longitude: 113.87283,
            name: '乒乓球室',
            address: '东莞理工学院体育馆侧门',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.905983,
            longitude: 113.870852,
            name: '桌球室',
            address: '东莞理工学院真草操场主席台',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.90603,
            longitude: 113.871718,
            name: '真草操场',
            address: '东莞理工学院真草操场',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.906055,
            longitude: 113.874265,
            name: '假草操场',
            address: '东莞理工学院假草操场',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          }
        ]
      },
      {
        "scale": 16,
        "name": "交通",
        "data": [{
          latitude: 22.908293,
          longitude: 113.872116,
          name: '理工体育中心公交站',
          address: '东莞理工学院理工体育中心公交站',
          image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
        }]
      },
      {
        "name": "生活服务",
        "scale": 16,
        "data": [{
            latitude: 22.908653,
            longitude: 113.873241,
            name: '创意美发',
            address: '东莞理工学院北门莞博社区附近',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.908176,
            longitude: 113.875472,
            name: '大学生生活超市',
            address: '东莞理工学院莞华社区旁边',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.90782,
            longitude: 113.875766,
            name: '自行车修理店',
            address: '东莞理工学院莞华社区旁边',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.907776,
            longitude: 113.875719,
            name: '博昌眼镜',
            address: '东莞理工学院莞华社区旁边',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.907388,
            longitude: 113.872714,
            name: '医务室',
            address: '东莞理工学院卫生所',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.908471,
            longitude: 113.87343,
            name: '天福便利店',
            address: '东莞理工学院莞博社区旁边',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          }
        ]
      },
      {
        "scale": 16,
        "name": "行政大楼",
        "data": [{
            latitude: 22.899016,
            longitude: 113.873852,
            name: '大礼堂',
            address: '东莞理工学院大礼堂',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.898091,
            longitude: 113.873208,
            name: '学术会议中心',
            address: '东莞理工学院学术会议中心',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          }
        ]
      },
      {
        "scale": 16,
        "name": "学生宿舍",
        "data": [{
            latitude: 22.90788,
            longitude: 113.874639,
            name: '12栋宿舍楼',
            address: '东莞理工学院12栋宿舍楼',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.90744,
            longitude: 113.875223,
            name: '11栋宿舍楼',
            address: '东莞理工学院11栋宿舍楼',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.908507,
            longitude: 113.874832,
            name: '莞华社区15栋',
            address: '东莞理工学院莞博社区15栋',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.90713,
            longitude: 113.875623,
            name: '莞逸社区',
            address: '东莞理工学院莞逸社区',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.9085,
            longitude: 113.874834,
            name: '23栋宿舍楼',
            address: '东莞理工学院莞博社区23栋',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          {
            latitude: 22.907349, 
            longitude: 113.876064,
            name: '莞馨三栋',
            address: '东莞理工学院莞馨社区',
            image:'https://img1.027art.cn/img/2020/03/1583870337801574.jpg'
          },
          
        ]
      }
    ]
  }
})