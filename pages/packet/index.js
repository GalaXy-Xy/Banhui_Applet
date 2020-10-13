import API from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      // 是否为班长
      num:'',
      user_id:'',
      class_id:'',
      sum_gold:'',
      user_gold:'',
      seleted:''
  },
  // 斑币跳转
  class_p(){
    var that = this
    // if(that.data.num == 12){
    //   console.log('111111111')
    //   var seleted = that.data.seleted
    //   wx.switchTab({
    //     url: '/pages/classAll/index',
    //   })
    // }else{
    //   console.log('222222222222')
    //   wx.request({
    //     url: API +'api/query_Joined',
    //     data:{
    //       user_id:that.data.user_id
    //     },
    //     success(res){
    //       console.log(res)
    //     }
    //   })
    //   // wx.switchTab({
    //   //   url: '/pages/classAll/index?seleted= '+ seleted,
    //   // })
    // }
      wx.switchTab({
        url: '/pages/classAll/index',
      })
 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var app = getApp()
    var data = getApp().globalData.data
    // console.log(data)
    that.setData({
      user_id:data.user_id
    })
    console.log(options)
    var num = options.isban
    that.setData({
      num:num,
      class_id:options.classid
    })
    if(options.classid == ''){
      that.LookUser()
    }else{
      that.LookUser()
      that.lookAll()
    }
    that.joinClass()
    if(options.isban != 12 && options.num2 !=2){
      app.globalData.classId = 1
    }else if( options.isban != 12 && options.num2==2){
      app.globalData.classId = 2
    }else{
      app.globalData.classId = 3
    }
  },
  // 查询班级总金币
  lookAll(){
    var that = this
   wx.request({
     url: API +'api/class_gold',
     data:{
      classmate_classid:that.data.class_id
     },
     success(res){
       console.log(res)
       if(res.data.code==200){
         that.setData({
          sum_gold:res.data.data.sum_gold
         })
       }
     }
   })
  },
  // 查看当前用户斑币
  LookUser(){
    var that = this
    wx.request({
      url: API +'api/userbanbi',
      data:{
        user_id:that.data.user_id
      },
      success(res){
        console.log(res)
        if(res.data.code == 200){
          that.setData({
            user_gold:res.data.data.user_gold
          })
        }
      }
    })
  },
  // 是否加入过班级
  joinClass(){
    var that = this
    wx.request({
      url: API +'api/query_Joined',
      data:{
        user_id:that.data.user_id
      },
      success(res){
        console.log(res)
        for(var index in res.data.data){
          console.log(res.data.data)
          if(res.data.data[index].class_id == that.data.class_id ){
              that.setData({
                seleted: 4,
              })
          }
      }
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
  onShow: function (options) {
    var that = this

    
  
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