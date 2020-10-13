// pages/test/index.js
import API from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 登录页面弹出
    isLogin:true,
    login:false,
    // 手机号码
    phone:'',
    encryptedData:'',
    session_key:'',
    iv:'',
    openid:'',
    sessionKey:'',
    // 昵称
    nickName:'',
    isLogin1:2
  },
  // 登录页面切换
  toggleLogin(){
    var that = this
    that.setData({
      isLogin:true,
      login:false
    })
  },
  // 登录- 获取用户手机号
  getUserPhone(e){
    var that = this
    
    console.log(e)
    that.setData({
      encryptedData:e.detail.encryptedData,
      iv:e.detail.iv
    })
    wx.request({
      url: API+'api/auth/phone',
      method:'post',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        encryptedData:that.data.encryptedData,
        session_key:that.data.sessionKey,
        iv:that.data.iv
      },
      success(RES){
        console.log(RES)
        that.setData({
          phone:RES.data.data.phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
        })
      }
    })
    // 弹窗
    that.setData({
      isLogin:false,
      login:true,
    })
  },
  // 一键登录 
  Login1(){
    var that = this
    var app = getApp()
    // 获取用户信息
    wx.login({
      success(ret){
        wx.getUserInfo({
          success(res){
            // console.log(res)
              // 发送请求
              if(that.data.openid==""){
                wx.showToast({
                  title: '登录失败',
                  duration:1000
                });return false
              }
              wx.request({
                url: API+'api/User_login',
                method:'get',
                header:{
                  'content-type': 'application/json' 
                },
                data:{
                  openid:that.data.openid,
                  user_nickname:res.userInfo.nickName
                },
                success(res){
                  console.log(res)
                  app.globalData.data = res.data.data
                  if(res.data.code===200){
                    getApp().globalData.isLogin = that.data.isLogin1
                    wx.switchTab({
                      url: '/pages/login/index'
                    })
                    wx.showToast({
                      title: '登录成功',
                      duration:1500,
                      icon:'success'
                    })
                  }else{
                    wx.showToast({
                      title: '登录失败，请重新登录',
                      duration:2000
                    })
                  }
                }
              })
          }
        })
      }
    })
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 隐藏tabbar

    // that.getUser();
    wx.login({
      success(res){
        wx.request({
          url: API+'api/obtain_openid',
          method:'get',
          header: {
            'content-type': 'application/json' 
          },
          data:{
            code:res.code
          },
          success(res){
            console.log(res)
            that.setData({
              sessionKey:res.data.data.session_key,
              openid:res.data.data.openid
            })
            if(res.data.data.session_key===""){
              wx.showToast({
                title: '登录失败,请重试',
                duration:1500
              })
              return false
            }
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
    var that = this
    // setTimeout(function(){
    //   that.setData({
    //     isLogin1:1
    //   })
    //   getApp().globalData.isLogin = this.data.isLogin1
    // },50000)

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