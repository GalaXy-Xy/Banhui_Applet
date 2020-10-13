// pages/del/del.js
import API  from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // inform_mesg:[],
    informdata:[],
    src :API,
    msg:'',
    data:'该评论已被删除'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this
    that.setData({
      msg:options.mesg
    })
      wx.request({
        url: API + '/api/sel_inform',
        data:{
          inform_id: options.id
        },
        success(res){
          that.setData({
            informdata:res.data.data
          })
          console.log(that.data.informdata)
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
  onShareAppMessage: function () {

  }
})