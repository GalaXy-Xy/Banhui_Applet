// pages/userInfo1-0/index.js
import API from '../../utils/api'
import {timeHandle} from '../../utils/date'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      flag:true,
      // 切换
      seleted:1,
      oppenId:'',
      user_id:'',
      // 用户昵称
      nikeName:'1111',
      // ID号
      ID:'456789jpg',
      userImg:'',
      Imgs:false,
      // 头像
      showSrc:true,
      src:'',
      src_s:API ,
      // 性别
      showGen:'',
      Gender:0,
      nantu:true,
      nvtu:true,
      // 星座
      xing:"魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手",
      arr:[20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22],
      xingzuo:'',
      // 生日
      birth:'',
      // 我的帖子
      card_my:[],
      NoCardMy:true,
      Mycard:true,
      // 加入的班级
      classAll:[],
      // 有无加入班级
      Noclass:true,
      class_join:true,
      isLogin:1
  },
  // 切换
  seletednow:function(e){
    console.log(e.target)
    var that = this
    if(this.data.seleted === e.target.dataset.num){
      return false
    }else{
      this.setData({
        seleted: e.target.dataset.num
      })
    }
  },
  show:function(){
    this.setData({
      flag:false
    })
  },
  hide:function(){
    this.setData({
      flag:true
    })
  },
  // 编辑客户资料
  editUser(){
    wx.navigateTo({
      url: '/pages/editUserForm/index',
    })
  },
  // 系统消息
  showMail(){
    var that = this
    var user_id = that.data.user_id
    console.log(user_id)
    wx.navigateTo({
      url: '/pages/SystemMessages/index?',
      success(res){
        res.eventChannel.emit('userid',that.data.user_id)
      }
    })
  },
  // 退出
  exit(){
    var that = this
    wx.switchTab({
      url: '/pages/login/index',
    })
    getApp().globalData.isLogin = that.data.isLogin
  }, 
 /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data = getApp().globalData.data
    var isLogin = getApp().globalData.isLogin
    if(isLogin == 1){
      that.setData({
        user_id:data.user_id,
        // isLogin:data
      })
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
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
    var isLogin = getApp().globalData.isLogin
    if(isLogin == 1){
        wx.redirectTo({
          url: '/pages/index/index',
        })
    }else{
      this.getIndex()  
    }
    
  },
    // 根据id获取用户信息
    getIndex:function(){
      var that = this
      var data = getApp().globalData.data
      console.log(data)
      that.setData({
        user_id:data.user_id
      })
      // if(data.user_avatar!= ""){
      //   that.setData({
      //     showSrc:false,
      //     src: Src,
      //   })
      // }
      wx.request({
        url: API+'api/query_user_information',
        method:'get',
        data:{
          user_id:data.user_id,
        },
        success(res){
          console.log(res)
          if(res.data.code==200){
            getApp().globalData.data=res.data.data;
            that.setData({
              showGen:res.data.data.user_gender,
              nikeName:res.data.data.user_nickname,
              ID:res.data.data.user_uuid,
              birth:res.data.data.user_birth
            })
            // 头像
            if(res.data.data.user_avatar!= ""){
              that.setData({
                showSrc:false,
                src:API + res.data.data.user_avatar,
              })
            }
            // 性别
            if(res.data.data.user_gender==0){
              that.setData({
                Gender:0,
                nantu:true,
                nvtu:true
              })
            }
            if(res.data.data.user_gender==1){
              that.setData({
                Gender:1,
                nantu:false,
                nvtu:true
              })
            }
            if(res.data.data.user_gender==2){
              that.setData({
                Gender:2,
                nvtu:false,
                nantu:true
              })
            }
          }  
          // 渲染星座
          var Bir = that.data.birth.split('-')
          console.log(Bir)
          console.log(Bir[1])
          console.log(Bir[2])
          var xz = that.data.xing.substr(Bir[1] * 2 - (Bir[2] < that.data.arr[Bir[1] - 1] ? 2 : 0), 2)
          that.setData({
            xingzuo:xz
          })
          // 渲染头像
          var Src = API + res.data.data.user_avatar
          if(res.data.data.user_avatar!==""){
            that.setData({
              showSrc:false,
              src: Src,
            })
          }
          // 渲染性别
          if(that.data.showGen==1){
            that.setData({
              showCon:'男'
            })
          }
          if(that.data.showGen==2){
            that.setData({
              showCon:'女'
            })
          }
          if(that.data.showGen==0){
            that.setData({
              selBir:true
            })
          }
          // if(res.data.data===1){
          //   that.setData({
          //     sub_suc:false
          //   })
          //   setTimeout(function(){
          //     that.setData({
          //       sub_suc:true
          //     })
          //   },1000)
          // }else{
          //   that.setData({sub_fail:false})
          //   setTimeout(function(){
          //     that.setData({
          //       sub_fail:true
          //     })
          //   },1000)
          // }
        }
      })
      // 查询帖子
      wx.request({
        url:  API +'api/usergetpost',
        data:{
          post_userid:data.user_id
        },
        success(res){
          console.log(res)
          if(res.data.code==200){
            that.setData({
              card_my:res.data.data
            })
            if(res.data.data.length == 0){
              that.setData({
                NoCardMy:false,
                Mycard:true
              })
            }else{
              that.setData({
                NoCardMy:true,
                Mycard:false
              })
            }
            var arrNew = that.data.card_my.map(item=>{
              // 转换时间格式
              item.post_createtime = timeHandle(item.post_createtime)
              // console.log(that.data.calssStateContent)
              that.setData({
                card_my:that.data.card_my
              })
            })
          }
        }
      })
      //查询班级
      wx.request({
        url: API +'api/query_Joined',
        data:{
          user_id:data.user_id
        },
        success(res){
          console.log(res)
          that.setData({
            classAll:res.data.data
          })
          res.data.data.map(item=>{
            if(item.bhc==''){
              that.setData({
                Noclass:false,
                class_join:true
              })
            }else{
              that.setData({
                Noclass:true,
                class_join:false
              })
            }
          })
        }
      })
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