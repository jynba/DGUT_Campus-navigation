// pages/showloa/showloa.js
//使用npm install 安装 exifreader 模块
import ExifReader from 'exifreader'
import EXIF from 'exif-js';
//此处使用的腾讯地图的 sdk JavaScript版本，请自行到官网下载
var QQMapWX = require('../../qqmap-wx-jssdk.js');
//经纬度
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onExif: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // 临时文件路径  http://tmp/UcfVFoFlBHisb890f9c1e0c2edd33eb4c18b3f15a427.jpg
        const filePath = res.tempFilePaths[0];
        wx.getFileSystemManager().readFile({
          filePath,
          success: (res) => {
            // 这里的 fileBuffer 是 ArrayBuffer 格式 
            console.log(res);
            const fileBuffer = res.data;
            EXIF.getData(fileBuffer, img => console.log('img:', img))
            const strPretty = EXIF.pretty(res.data)
            console.log('strPretty:', strPretty)
            const tags = EXIF.getAllTags(res.data)
            console.log('tags:', tags);
            let direction;
            if (tags.GPSImgDirection) {
              const directionArry = tags.GPSImgDirection; // 方位角
              direction = directionArry.numerator / directionArry.denominator;
            }
            let Longitude;
            if (tags.GPSLongitude) {
              const LongitudeArry = tags.GPSLongitude;
              const longLongitude =
                LongitudeArry[0].numerator / LongitudeArry[0].denominator +
                LongitudeArry[1].numerator / LongitudeArry[1].denominator / 60 +
                LongitudeArry[2].numerator / LongitudeArry[2].denominator / 3600;
              Longitude = longLongitude.toFixed(8);
            }
            let Latitude;
            if (tags.GPSLatitude) {
              const LatitudeArry = tags.GPSLatitude;
              const longLatitude =
                LatitudeArry[0].numerator / LatitudeArry[0].denominator +
                LatitudeArry[1].numerator / LatitudeArry[1].denominator / 60 +
                LatitudeArry[2].numerator / LatitudeArry[2].denominator / 3600;
              Latitude = longLatitude.toFixed(8);
            }
            console.log(direction, Longitude, Latitude);
          }
        })
      }
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
  onShareAppMessage: function () {}
})