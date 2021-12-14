// pages/lights/lights.js
let leftHeight = 0,
  rightHeight = 0; //分别定义左右两边的高度
let query;
const app = getApp()
const db = wx.cloud.database(); //初始化数据库
const mylights = db.collection('lights')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasonload: false,
    productCon_l: [],
    productCon_r: [],
    unlike: 'https://tdsxcx.dxjujia.com/img/index/index_03.png',
    like: 'https://tdsxcx.dxjujia.com/img/index/index_02.png',
    PageCount: 0,
    lights: [
    ],
  },

  getData:function(callback){
    // if(!callback){
    //   callback=res=>{}
    // }
    var showinfo = 8;
    wx.showLoading({
      title: '正在玩命加载中',
    })
    //一次显示10条数据；分页显示
    mylights.orderBy('createTime','desc').skip(this.pageData.skip).limit(showinfo).get().then(res=>{
      let oldData= this.data.lights;
      let resdata= res.data.length
      this.setData({
        lights: oldData.concat(res.data)
      },res=>{
        query = wx.createSelectorQuery();
        this.loopList(this.pageData.skip)
        console.log(res)
        if(resdata < showinfo){
          this.pageData.skip=this.pageData.skip+resdata
        }
        else{
          this.pageData.skip=this.pageData.skip+showinfo          
        }
        wx.hideLoading()
        // callback();
      })
    })
    this.data.hasonload=true;
  },
  pageData:{
    skip:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getData();
  },

  onShow : function(e){
    if(!this.data.hasonload){
      this.onLoad()
    }
    this.data.hasonload=false;
    
    // var pages = getCurrentPages();
    // var prevPage = pages[pages.length - 1]; //上一个页面
    // //直接调用上一个页面对象的setData()方法，把数据存到上一个页面中去
    // console.log(prevPage)
  },

  loopList(index) {
    const {
      lights,
      productCon_l,
      productCon_r
    } = this.data;
    console.log(index)
    if (!lights[index]) return;
    leftHeight <= rightHeight ? productCon_l.push(lights[index]) : productCon_r.push(lights[index]); //判断两边高度，来决定添加到那边
    this.getBoxHeight(productCon_l, productCon_r).then(() => {
      this.loopList(++index)
    })
    this.setData({
      PageCount:index+1
    })
  },

  getBoxHeight(productCon_l, productCon_r) { //获取左右两边高度
    return new Promise((resolve, reject) => {
      this.setData({
        productCon_l,
        productCon_r
      }, () => {
        query.select('#pro_l').boundingClientRect();
        query.select('#pro_r').boundingClientRect();
        query.exec((res) => {
          leftHeight = res[0].height; //获取左边列表的高度
          rightHeight = res[1].height; //获取右边列表的高度
          resolve();
        });
      });
    })
  },
  submit: function (e) {
    wx.navigateTo({
      url: '../uplights/uplights',
    })
  },
  islike: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.favoriteid;
    var productCon_l = that.data.productCon_l;
    var productCon_r = that.data.productCon_r;
    for (let j = 0; j < productCon_l.length; j++) {
      if (id == productCon_l[j].id) {
        productCon_l[j].isFavorite = !productCon_l[j].isFavorite;
        this.setData({
          productCon_l: productCon_l
        })
        break;
      }
    }
    for (let j = 0; j < productCon_r.length; j++) {
      if (id == productCon_r[j].id) {
        productCon_r[j].isFavorite = !productCon_r[j].isFavorite;
        this.setData({
          productCon_r: productCon_r
        })
        break;
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
    // this.pageData.skip=0;
    // this.setData({lights:[]});
    // this.getData(res=>{
    //   wx.stopPullDownRefresh();
    // });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getData();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})