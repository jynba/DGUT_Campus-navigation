// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp();
const db = wx.cloud.database();
const mylocation = db.collection('location');
// pages/home/home.js
Page({

  data: {
    showUp:false,
    task: {},
    buildData: app.globalData.map,
    hidden: true,
    // 设置markers
    markers: [],
    // 设置莞工的数据
    diydata: [],
    studydata: [],
    eatdata: [],
    rundata: [],
    trandata: [],
    lifedata: [],
    admindata: [],
    dordata: [],
    //输入的查询地址
    inputvalue: '',
    //起始地址
    startPoint: null,
    endPoint: null,
    //获取当前分类
    currentdatabase: null,
    modalimg: "https://img1.027art.cn/img/2020/03/1583870337801574.jpg",
    modalname: null,
    modaladdress: null,
    hasshow:false,
  },
  
  changeUpDown:function(e){
    this.setData({
      showUp:!this.data.showUp
    })
  },
  
  //设置下拉刷新
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      currentTab: 0 //当前页的一些初始数据，视业务需求而定
    })
    this.onLoad(); //重新加载onLoad()
  },
  //点击按钮实现地图上对应的点
  diyplace: function () {
    var that = this;
    var result = that.data.diydata;
    // console.log(result);
    var number = that.data.markers.length;
    let markers = that.data.markers
    markers.splice(1, number - 1)
    that.setData({
      markers: markers,
      currentdatabase: result
    })
    for (var i = 0; i < result.length; i++) {
      let lat = result[i].latitude;
      let lon = result[i].longitude;
      let name = result[i].name;
      var index = "markers[" + (i + 1) + "]";
      that.setData({
        [index]: {
          id: i + 1,
          latitude: lat,
          longitude: lon,
          iconPath: "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXsrAqcgjc2PiaVgKdpvkGVcUDRm4vWOiaKqd1v63fbKjQd12WlyUicRPMCpFcODAwS7jCqGWkeratibvSg/0?wx_fmt=png",
          width: 30,
          height: 30,
          label: {
            content: name,
            color: '#FFFFFF',
            bgColor: '#6495ED',
            fontSize: 13,
            anchorX: 10,
            anchorY: -23,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#6495ED',
            padding: 2,
            //display: 'ALWAYS'
          }
        }
      })
      this.showPoint();
    }
  },
  studyplace: function () {
    var that = this;
    var result = that.data.studydata;
    var number = that.data.markers.length;
    let markers = that.data.markers
    markers.splice(1, number - 1)
    that.setData({
      markers: markers,
      currentdatabase: result
    })

    for (var i = 0; i < result.length; i++) {
      let lat = result[i].latitude;
      let lon = result[i].longitude;
      let name = result[i].name;
      var index = "markers[" + (i + 1) + "]";
      that.setData({
        [index]: {
          id: i + 1,
          latitude: lat,
          longitude: lon,
          iconPath: "../../image/学习icon.png",
          width: 30,
          height: 30,
          label: {
            content: name,
            color: '#FFFFFF',
            bgColor: '#6495ED',
            fontSize: 13,
            anchorX: 16,
            anchorY: -22.5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#6495ED',
            padding: 2,
            //display: 'ALWAYS'
          }
        }
      })
      this.showPoint()
    }
  },
  eatplace: function () {
    var that = this;
    var result = that.data.eatdata;
    var number = that.data.markers.length;
    let markers = that.data.markers
    markers.splice(1, number - 1)
    that.setData({
      markers: markers,
      currentdatabase: result
    })
    for (var i = 0; i < result.length; i++) {
      let lat = result[i].latitude;
      let lon = result[i].longitude;
      let name = result[i].name;
      var index = "markers[" + (i + 1) + "]";
      that.setData({
        [index]: {
          id: i + 1,
          latitude: lat,
          longitude: lon,
          iconPath: "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXsoIu823w9hdgloSN74rC6jQq8EwwibiaSuCjwvP79iclIRicSQp7N1XBNbbSEHZ7tNpW4a4DqEiaUES1XQ/0?wx_fmt=png",
          width: 30,
          height: 30,
          label: {
            content: name,
            color: '#FFFFFF',
            bgColor: '#6495ED',
            fontSize: 13,
            anchorX: 10,
            anchorY: -26,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#6495ED',
            padding: 2,
            //display: 'ALWAYS'
          }
        }
      })
      this.showPoint()
    }
  },
  runplace: function () {
    var that = this;
    var result = that.data.rundata;
    var number = that.data.markers.length;
    let markers = that.data.markers
    markers.splice(1, number - 1)
    that.setData({
      markers: markers,
      currentdatabase: result
    })
    for (var i = 0; i < result.length; i++) {
      let lat = result[i].latitude;
      let lon = result[i].longitude;
      let name = result[i].name;
      var index = "markers[" + (i + 1) + "]";
      that.setData({
        [index]: {
          id: i + 1,
          latitude: lat,
          longitude: lon,
          iconPath: "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXsoIu823w9hdgloSN74rC6jQpZbUtS4sQQic9DSVmwJwWfTiclRhcLTEcD4M9haCVIB531Qv057mzsHg/0?wx_fmt=png",
          width: 30,
          height: 30,
          label: {
            content: name,
            color: '#FFFFFF',
            bgColor: '#6495ED',
            fontSize: 13,
            anchorX: 14,
            anchorY: -26,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#6495ED',
            padding: 2,
            //display: 'ALWAYS'
          }
        }
      })
      this.showPoint()
    }
  },
  tranplace: function () {
    var that = this;
    var result = that.data.trandata;
    var number = that.data.markers.length;
    let markers = that.data.markers
    markers.splice(1, number - 1)
    that.setData({
      markers: markers,
      currentdatabase: result
    })
    for (var i = 0; i < result.length; i++) {
      let lat = result[i].latitude;
      let lon = result[i].longitude;
      let name = result[i].name;
      var index = "markers[" + (i + 1) + "]";
      that.setData({
        [index]: {
          id: i + 1,
          latitude: lat,
          longitude: lon,
          iconPath: "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXsoIu823w9hdgloSN74rC6jQ5rp577RZeV7zhNicC9U9v8CANA8lgHdPyQUML3QRicibib81F7J1jDJx0g/0?wx_fmt=png",
          width: 30,
          height: 30,
          label: {
            content: name,
            color: '#FFFFFF',
            bgColor: '#6495ED',
            fontSize: 13,
            anchorX: 14,
            anchorY: -26,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#6495ED',
            padding: 2,
            //display: 'ALWAYS'
          }
        }
      })
      this.showPoint()
    }
  },
  lifeplace: function () {
    var that = this;
    var result = that.data.lifedata;
    var number = that.data.markers.length;
    let markers = that.data.markers
    markers.splice(1, number - 1)
    that.setData({
      markers: markers,
      currentdatabase: result
    })
    for (var i = 0; i < result.length; i++) {
      let lat = result[i].latitude;
      let lon = result[i].longitude;
      let name = result[i].name;
      var index = "markers[" + (i + 1) + "]";
      that.setData({
        [index]: {
          id: i + 1,
          latitude: lat,
          longitude: lon,
          iconPath: "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXsoIu823w9hdgloSN74rC6jQvrtTOMMOPdYTGwwzZfmST8cic2jfppNxwzavSWW16bXViaXYqYbHstSQ/0?wx_fmt=png",
          width: 30,
          height: 30,
          label: {
            content: name,
            color: '#FFFFFF',
            bgColor: '#6495ED',
            fontSize: 13,
            anchorX: 14,
            anchorY: -26,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#6495ED',
            padding: 2,
            //display: 'ALWAYS'
          }
        }
      })
      this.showPoint()
    }
  },
  adminplace: function () {
    var that = this;
    var result = that.data.admindata;
    var number = that.data.markers.length;
    let markers = that.data.markers
    markers.splice(1, number - 1)
    that.setData({
      markers: markers,
      currentdatabase: result
    })
    for (var i = 0; i < result.length; i++) {
      let lat = result[i].latitude;
      let lon = result[i].longitude;
      let name = result[i].name;
      var index = "markers[" + (i + 1) + "]";
      that.setData({
        [index]: {
          id: i + 1,
          latitude: lat,
          longitude: lon,
          iconPath: "../../image/行政icon.png",
          width: 30,
          height: 30,
          label: {
            content: name,
            color: '#FFFFFF',
            bgColor: '#6495ED',
            fontSize: 13,
            anchorX: 14,
            anchorY: -26,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: '#6495ED',
            padding: 2,
            //display: 'ALWAYS'
          }
        }
      })
      this.showPoint();
    }
  },
  dorplace: function () {
    var that = this;
    var result = that.data.dordata;
    var number = that.data.markers.length;
    let markers = that.data.markers
    markers.splice(1, number - 1)
    that.setData({
      markers: markers,
      currentdatabase: result
    })
    for (var i = 0; i < result.length; i++) {
      let lat = result[i].latitude;
      let lon = result[i].longitude;
      let name = result[i].name;
      var index = "markers[" + (i + 1) + "]";
      that.setData({
        [index]: {
          id: i + 1,
          latitude: lat,
          longitude: lon,
          joinCluster: true,
          iconPath: "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXsoIu823w9hdgloSN74rC6jQ8cbVziaAj8rYh9dHmMFogXJZH01icOWZGRbw5KJvCFh1t5CQZC3icj6Cw/0?wx_fmt=png",
          width: 30,
          height: 30,
          label: {
            content: name,
            color: '#FFFFFF',
            bgColor: '#6495ED',
            fontSize: 13,
            anchorX: 14,
            anchorY: -25,
            borderRadius: 5,
            borderWidth: 0.8,
            borderColor: '#6495ED',
            padding: 2,
            //display: 'ALWAYS'
          }
        }
      })
    }
    this.showPoint();
  },
  //获取输入的查询地址
  inputplace: function (e) {
    this.setData({
      inputvalue: e.detail.value
    })
  },
  // 搜索
  nearby_search: function () {
    var that = this;
    var text = that.data.inputvalue;
    console.log(that.data.inputvalue);
    // 调用接口
    qqmapsdk.search({
      keyword: text, //搜索关键词
      rectangle:'22.894908,113.868604,22.910489,113.880713',//限制矩形范围（左下右上）
      location: '22.902684,113.875159', //设置周边搜索中心点
      success: function (res) { //搜索成功后的回调
        var texttitle = '共找到' + res.data.length + '个地点'
        wx.showToast({
          title: texttitle,
          icon: 'success',
          duration: 2000
        })
        // var number = that.data.markers.length;
        // let markers = that.data.markers;
        // markers.splice(1, number - 1)
        // that.setData({
        //   markers: markers
        // })
        // console.log(res.data[0], location);
        for (var i = 0; i < res.data.length; i++) {
          let lat = res.data[i].location.lat;
          let lon = res.data[i].location.lng;
          let name = res.data[i].title;
          var index = "markers[" + (i + 1) + "]";
          that.setData({
            [index]: {
              id: i + 1,
              latitude: lat,
              longitude: lon,
              iconPath: "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXspzHSgfqhNRrfZ2FAic4JMmZLKPUMFVZqyt1Bic6YkRgqLSoJk15hxvxFTakjuEk2UnFnCcI7P4zh1w/0?wx_fmt=png",
              width: 25,
              height: 25,
              label: {
                content: name,
                color: '#FFFFFF',
                bgColor: '#6495ED',
                fontSize: 13,
                anchorX: 14,
                anchorY: -24,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#6495ED',
                padding: 2,
                //display: 'ALWAYS'
              }
            },
            currentdatabase: res.data
          })
          that.showPoint();
        }
      },
      fail: function (res) {
        console.log(res);
        wx.showToast({
          title: '抱歉，搜索错误',
          icon: 'fail',
          duration: 2000
        })
      },
      complete: function (res) {
        // console.log(res);
      }
    });
//显示附近
    // qqmapsdk.reverseGeocoder({
    //   location: '22.902684,113.875159',
    //   get_poi: 1,
    //   poi_options: 'policy=2;radius=2000;page_size=20;page_index=1',
    //   success: function(res) {
    //        console.log(res);
    //        that.setData({
    //             addressList: res.result.pois
    //        })
    //   },
    //   fail: function(res) {
    //        console.log(res);
    //   },
    //   complete: function(res) {
    //        console.log(res);
    //   }
    // });
  },
  //点击地点进行路径规划
  onPointTap: function (e) {
    console.log(e)
    var that = this;
    var lat = ''; // 获取点击的markers经纬度
    var lon = ''; // 获取点击的markers经纬度
    var name = ''; // 获取点击的markers名称
    var markerId = e.detail.markerId; // 获取点击的markers  id
    var markersda = this.data.markers;
    var currentdatabase = this.data.currentdatabase;
    //定位所点击的坐标点
    for (var item of markersda) {
     //遍历判断id匹配当前点击的id，获取信息
      if (item.id === markerId) {
        lat = item.latitude;
        lon = item.longitude;
        name = item.label.content;
        break;
      }
    }
    //初始化起点
    var startPoint = JSON.stringify({
      'name': markersda[0].callout.content,
      'latitude': markersda[0].latitude,
      'longitude': markersda[0].longitude
    });
    var endPoint = JSON.stringify({ //终点
      'name': name,
      'latitude': lat,
      'longitude': lon
    });

    if (currentdatabase[markerId - 1].name != null) {
      that.setData({
        hidden: false,
        modalname: currentdatabase[markerId - 1].name
      })
    } else {
      that.setData({
        hidden: false,
        modalname: currentdatabase[markerId - 1].name
      })
    }
    
    that.setData({
      hidden: false,
      modalimg: currentdatabase[markerId - 1].image,
      modaladdress: currentdatabase[markerId - 1].address,
      startPoint: startPoint,
      endPoint: endPoint
    })
  },
  // 路径规划
  // test: function () {
  //   //let plugin = requirePlugin('routePlan');
  //   let key = ''; //使用在腾讯位置服务申请的key
  //   let referer = 'cugerguider'; //调用插件的app的名称
  //   let endPoint = JSON.stringify({ //终点
  //     'name': '东莞理工学院（松山湖）',
  //     'latitude': 22.902684,
  //     'longitude': 113.875159
  //   });
  //   wx.navigateTo({
  //     url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&startPoint=' + startPoint + '&endPoint=' + endPoint + '&navigation=1&themeColor=#555566'
  //   });
  // },
  //获取自己当前的位置
  getmyPlace: function () {
    var that = this;
    wx.getLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          markers: [{
            latitude: res.latitude,
            longitude: res.longitude,
            iconPath: "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXspzHSgfqhNRrfZ2FAic4JMmZ0AM5aIe84WF1J4gYdLBAgdxrvKSia8Zh475s0TVL2salmaicLMbjPy9A/0?wx_fmt=png",
            width: 25,
            height: 25,
            callout: {
              content: "当前位置",
              color: '#0000ff',
              fontSize: 13,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#0000ff',
              padding: 2,
              display: 'ALWAYS'
            }
          }]
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: '6ATBZ-4F4C2-G7RU3-CUZE5-QVTFH-Y6FHU'
    });
    var that = this;
    mylocation.get().then(res => {
      that.data.diydata = res.data
      //拿到res=option.id后用setData渲染到界面
    })

    // console.log(that.data.diydata);
    var study = that.data.buildData[1].data;
    var eat = that.data.buildData[2].data;
    var run = that.data.buildData[3].data;
    var tran = that.data.buildData[4].data;
    var life = that.data.buildData[5].data;
    var admi = that.data.buildData[6].data;
    var ador = that.data.buildData[7].data;
    that.setData({
      eatdata: eat,
      studydata: study,
      rundata: run,
      trandata: tran,
      lifedata: life,
      admindata: admi,
      dordata: ador
    })
    //判断所在位置是否在校区内
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        //console.log(res)
        var nowlatitude = res.latitude
        var nowlongitude = res.longitude
        if ((nowlatitude > 22.891144) && (nowlatitude < 22.91575) && (nowlongitude > 113.869188) && (nowlongitude < 113.883874)) {
          that.setData({
            markers: [{
              id: 0,
              latitude: nowlatitude,
              longitude: nowlongitude,
              iconPath: "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXspzHSgfqhNRrfZ2FAic4JMmZ0AM5aIe84WF1J4gYdLBAgdxrvKSia8Zh475s0TVL2salmaicLMbjPy9A/0?wx_fmt=png",
              width: 25,
              height: 25,
              callout: {
                content: "当前位置",
                color: '#0000ff',
                fontSize: 13,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#0000ff',
                padding: 2,
                display: 'ALWAYS'
              }
            }]
          })
        } else if(!that.data.hasshow){  //若不在校区，则设置默认地点为北门
          wx.showModal({
            title: '提示',
            content: '当前位置不在校区内，是否切换？',
            success(res) {
              if (res.confirm) {
                that.setData({
                  markers: [{
                    id: 0,
                    latitude: 22.902684,
                    longitude: 113.875159,
                    iconPath: "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXspzHSgfqhNRrfZ2FAic4JMmZ0AM5aIe84WF1J4gYdLBAgdxrvKSia8Zh475s0TVL2salmaicLMbjPy9A/0?wx_fmt=png",
                    width: 25,
                    height: 25,
                    callout: {
                      content: "北门",
                      color: '#0000ff',
                      fontSize: 13,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#0000ff',
                      padding: 2,
                      display: 'BYCLICK'
                    }
                  }]
                })
              } else if (res.cancel) {
                that.setData({
                  markers: [{
                    id: 0,
                    latitude: nowlatitude,
                    longitude: nowlongitude,
                    iconPath: "https://mmbiz.qpic.cn/mmbiz_png/ymce5HAJXspzHSgfqhNRrfZ2FAic4JMmZ0AM5aIe84WF1J4gYdLBAgdxrvKSia8Zh475s0TVL2salmaicLMbjPy9A/0?wx_fmt=png",
                    width: 25,
                    height: 25,
                    callout: {
                      content: "当前位置",
                      color: '#0000ff',
                      fontSize: 13,
                      borderRadius: 5,
                      borderWidth: 1,
                      borderColor: '#0000ff',
                      padding: 2,
                      display: 'ALWAYS'
                    }
                  }]
                })
              }
            }
          })
          that.data.hasshow = true;
        }
      }
    });
  },
  onShow: function () {
    this.onLoad();//会触发两次
  },
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
	// }
	},
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap',this);
  },

  // 设置点聚合
  // initMarkerCluster: function () {
  //   this.mapCtx.initMarkerCluster({
  //     enableDefaultStyle: true,
  //     zoomOnClick: true,
  //     gridSize: 20,
  //     complete(res) {
  //       console.log('initMarkerCluster', res)
  //     }
  //   })
  // },

  clickButton: function (e) {
    console.log(this.data.fullscreen)
    //打印所有关于点击对象的信息
    this.setData({
      fullscreen: !this.data.fullscreen
    })
  },
   /**
   * 获取保存map显示区域中心的坐标
   */
  getMapLoaction(){
    this.mapCtx.getCenterLocation({
      success: res=>{
        let location = {
          lat: res.latitude,
          lng: res.longitude
        };
        this.setData({
          location: location
        })
        console.log(location,'MAP');
      }
    })
  },

  showCurPos(){
    if(!this.mapCtx) return;
    // 地图移动回当前位置
    this.mapCtx.moveToLocation({
      success:res=>{
        // 防止重复触发
        clearTimeout(this.data.mapT);
        // 获取当前位置的经纬度
        this.setData({
          mapT: setTimeout(()=>{this.getMapLoaction()},500)
        });
      }
    });
  },
  showPoint(){
    if(!this.mapCtx) return;
    //包含所有坐标点
    let includePointsData = []
    for (let i = 0; i < this.data.markers.length; i++) {
      includePointsData.push({
        latitude: this.data.markers[i].latitude,
        longitude:this.data.markers[i].longitude
      })
    }
    this.mapCtx.includePoints({
      padding: [100],
      points: includePointsData
    })
  },
  modalcancel: function (e) {
    this.setData({
      hidden: true,
    })
  },
  modalconfirm: function (e) {
    var that = this;
    this.setData({
      hidden: true,
    })
    //路径规划
    //var plugin = requirePlugin('routePlan');
    var key = 'CFUBZ-WXKLW-3PKRK-O6JJY-KMAY5-EJB5L'; //使用在腾讯位置服务申请的key
    var referer = '莞工地图'; //调用插件的app的名称
    //var themeColor = '#7B68EE'; //主题颜色
    var endPoint = that.data.endPoint;
    var startPoint = that.data.startPoint;
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&startPoint=' + startPoint + '&navigation=1&themeColor=#7B68EE'
    });
  }
})