// pages/createdCode/index.js
import QR from '../../utils/qrCode'
import API from '../../utils/api'
var qrcode
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath:'',
    // 存储定时器
   setInter:'',
   calssNmae:'',
   calssImg:'',
   src_tem:'',
   aa:1,
   calssId:''
  },
  close(){
    wx.redirectTo({
      url: '/pages/editClassForm/index',
    })
  },
  // 二维码下载
  download: function () {
    var that = this
    console.log('save')
    wx.downloadFile({
      url: that.data.imagePath,//图片地址
      success: function (res) {
        console.log('1111')
        console.log(res)
        //图片保存到本地
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (data) {
            wx.hideLoading()
            wx.showModal({
              title: '提示',
              content: '您的二维码已保存到相册',
              showCancel: false,
            })
          },
          fail: function (err) {
            if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny" || err.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {
              // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
              wx.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success: modalSuccess => {
                  wx.openSetting({
                    success(settingdata) {
                      console.log("settingdata", settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击即可保存',
                          showCancel: false,
                        })
                      } else {
                        wx.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData", failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
            }
          },
          complete(res) {
            wx.hideLoading()
          }
        })
      }
    })
    // wx.showActionSheet({
    //     itemList: ['保存图片'],
    //     success: function (res) {
    //         console.log(res.tapIndex)
    //         if (res.tapIndex == 0) {
    //           var src = that.data.imagePath
    //           wx.getStorage({
    //             key: 'key',
    //             success(res){
    //               // console.log(res)
    //               wx.saveImageToPhotosAlbum({
    //                 filePath: res.data,
    //                 success(res){
    //                   console.log('保存图片')
    //                   console.log(res)
    //                   wx.redirectTo({
    //                     url: '/pages/editClassForm/index',
    //                   })
    //                 }
    //               }) 
    //             }
    //           })
              
    //         }
    //     }
    // })
  },
    // 加入班级
  joinClass(){
    var that = this
    var data = getApp().globalData.data
    wx.request({
      url: API + 'api/insertclassmate',
      method:'get',
      data:{
        classmate_userid:data.user_id,
        classmate_classid:that.data.calssId
      },
      success(res){
        console.log(res)
        if(res.data.data==1){
          wx.showToast({
            title: '加入成功',
            duration:1500
          })
          // wx.request({
          //   url: API +'api/query_Joined',
          //   data:{
          //     user_id:that.data.userID
          //   },
          //   success(res){
          //   }
          // })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var dom = wx.createSelectorQuery().select('#canvas')
    var data = getApp().globalData.data
    console.log(options)
    that.setData({
      calssNmae:options.calssNmae,
      calssImg:options.calssImg,
      calssId:options.classId
    })
    wx.request({
      url: API +'/api/HuoQuWecat',
      success(res){
        console.log(res)

        wx.request({
          url: 'https://www.huamaidb.com/home/saas/index',
          data:{
            "action":"all_small_code",
            "wxsmall_appid":res.data.appid,
            "wxsmall_appsecret":res.data.appsecret,
            "wxsmall_path":"/pages/classAll/index"
          },
          success(res){
            // console.log(res)
            that.setData({
              imagePath:res.data.wxsmall_img
            })
            wx.setStorage({
              data: res.data.wxsmall_img,
              key: 'key',
            })
          }
        })
      }
    })
    
    // 获取access_token
    // wx.request({
    //   url: 'https://api.weixin.qq.com/cgi-bin/token',
    //   data:{
    //     grant_type:'client_credential',
    //     appid:'wxbf8fbb616cb97b37',
    //     secret:'d2a47e03e5bb6716f58d278fbd9358dd',
    //   },
    //   success(res){
    //     console.log(res)
    //     wx.request({
    //       url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode',
    //       method:'post',
    //       data:{
    //         access_token:res.data.access_token,
    //         path:"/pages/classAll/index",
    //         width:295,
    //         // line_color:{"r":344,"g":0,"b":0}
    //       },
    //       success(res){
    //         console.log(res)
    //         that.setData({
    //           imagePath:res.data.tempFilePath
    //         })
    //       }
    //     })
    //   }
    // })
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