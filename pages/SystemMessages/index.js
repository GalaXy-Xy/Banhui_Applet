import API  from '../../utils/api'
import {timeHandle} from '../../utils/date'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: true,
    flag_expel:true,
    flag_zx:true,
    user_id:'',
    inform_mesg:[],
    src :API,
    cont:[],
    infrom_id:''
  },
  // 弹出
  show: function () {
    this.setData({ 
      flag: false
    }) 
  },
  // 关闭
  hide: function () {
    this.setData({ 
      flag: true
    }) 
  },
  nav:function(e){
    console.log(e)
    wx.request({
      url: API + '/api/update_inform',
      data:{
        inform_id:e.currentTarget.id
      },
      success:function(res){
          console.log(res)
      }
    })
    if(e.currentTarget.dataset.hint!=0){
        wx.navigateTo({
          url: '/pages/del/del?id='+e.currentTarget.id+'&mesg='+e.currentTarget.dataset.meg
        })
    }
    if(e.currentTarget.dataset.hint==0){
      var postId = e.currentTarget.dataset.postid
      wx.navigateTo({
        url: '/pages/AllloginDetail/index?postId='+postId+'&classid='+e.currentTarget.dataset.classid
      })
    }
    // wx.navigateTo({
    //   url: '/pages/del/del?id='+e.currentTarget.id+'&mesg='+e.currentTarget.dataset.meg
    // })
  },
  onLoad:function(options){
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('userid', function(data) {
      console.log(data)
      that.setData({
        user_id:data
      })
      wx.request({
        url: API + 'api/Query_user_inform',
        data:{
          inform_hintuser: data
        },
        success(res){
          console.log(res)
          if(res.data.code==200){
            that.setData({
              inform_mesg:res.data.data
            })
            console.log(res.data.data)
            console.log(that.data.inform_mesg)
          }
          var arrNew =  that.data.inform_mesg.map(item=>{
            // 转换时间格式
            item.inform_date = timeHandle(item.inform_date)
            console.log(item.inform_date)
            that.setData({
              cont:that.data.cont,
              inform_mesg:that.data.inform_mesg
            })  
          })
        }
      }) 
    })
   


  },
  onShow(){
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('userid', function(data) {
      console.log(data)
      that.setData({
        user_id:data
      })
    })
    wx.request({
      url: API + 'api/Query_user_inform',
      data:{
        inform_hintuser: that.data.user_id
      },
      success(res){
        console.log(res)
        if(res.data.code==200){
          that.setData({
            inform_mesg:res.data.data
          })
          console.log(res.data.data)
          console.log(that.data.inform_mesg)
        }
        var arrNew =  that.data.inform_mesg.map(item=>{
          // 转换时间格式
          item.inform_date = timeHandle(item.inform_date)
          console.log(item.inform_date)
          that.setData({
            cont:that.data.cont,
            inform_mesg:that.data.inform_mesg
          })  
        })
      }
    }) 
  }
  
})