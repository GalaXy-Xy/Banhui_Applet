import API from '../../utils/api'
import {timeHandle} from '../../utils/date'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topNav:0,
    src:API,
    // tab 切换
    seleted:1,
    class_id:'',
    // 所有帖子
    allContent:[],
    user_id:'',
    joinClas:[],
    NoAllCon:true,
    AllCon:true,
    joinClass:true,
    NojoinClass:true,
    isban:'',
    join_Class:2,
    isLogin:''
  },
    // 页面滚动
    onPageScroll: function (t) {
      var that = this
      // console.log(t.scrollTop)
      that.setData({
        topNav:t.scrollTop
      })
    },
  // 切换
  seletednow:function(e){
    var that= this;
    if(this.data.seleted===e.target.dataset.num){
      return false;
    }else{
      this.setData({
        seleted: e.target.dataset.num
      })
    }
    if(e.target.dataset.num == 1){
      that.setData({
        NoAllCon:false,
        AllCon:false
      })
      that.LookAll()
    }
    if(e.target.dataset.num == 2){
        if(that.data.isLogin ==1){
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }else{
          //  查询已加入班级
          wx.request({
            url:  API + '/api/query_post_user',
            data:{
              classmate_userid:that.data.user_id
            },
            success(res){
              console.log(res)
              if(res.data.code==200){
                that.setData({
                  joinClas:res.data.data
                })
                console.log(res.data.data)
              }
              if(res.data.data.length == 0){
                      that.setData({
                        NoAllCon:true,
                        AllCon:true,
                        joinClass:true,
                        NojoinClass:false
                      })
              }else{
                      that.setData({
                        NoAllCon:true,
                        AllCon:true,
                        joinClass:false,
                        NojoinClass:true
                      })
              }
              var arrNew =  that.data.joinClas.map(item=>{
                // 转换时间格式
                item.post_createtime = timeHandle(item.post_createtime)
                console.log(item.post_createtime)
                that.setData({
                  joinClas:that.data.joinClas
                })  
                
              })
            }
          })
        }

    }
  },
  // 去加入班级
  gojion(){
    wx.switchTab({
      url: '/pages/classAll/index',
    })
  },
  // 跳转详情页
  cardDesc(e){
    console.log(e)
    var that = this
    if(that.data.isLogin == 1){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }else{
      var postId = e.currentTarget.dataset.postid
      var className = e.currentTarget.dataset.className
      var calssImg = e.currentTarget.dataset.calssImg
      wx.navigateTo({
        url: '/pages/AllloginDetail/index?postId='+ postId + '&className=' + e.currentTarget.dataset.classname + '&calssImg=' + e.currentTarget.dataset.classimg +'&calssid='+ e.currentTarget.dataset.calssid,
      })
    }
  },
  // 跳转班级主页
  calssDesc(e){
    console.log(e)
    var that = this
    
    if(that.data.isLogin == 1){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }else{
      var calssid = e.currentTarget.dataset.calssid
      wx.navigateTo({
        url: '/pages/allclassDetail/index?calssid='+calssid +'&userId='+that.data.user_id,
      })
    }
  },
    //已加入班级跳转
    created_J(e){
      console.log(e)
      var that  = this
      var classmate_classid = e.currentTarget.dataset.id
      var num_J = that.data.num_J
      wx.navigateTo({
        url: '/pages/joinClassDetail/index?classmate_classid='+classmate_classid +'&num_J= '+that.data.num_J +'&calssid' + that.data.class_num ,
        // success(res){
        //   res.eventChannel.emit("classmate_classid",{classmate_classid,num_J})
        // }
      })
    },
    // 红包
    packet(){
      var that = this
      var num = that.data.isban
      wx.navigateTo({
        url: '/pages/packet/index?isban='+num +'&classid='+that.data.class_id +'&num2=' +that.data.join_Class,
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    // that.LookAllClass()
  },
  // 查询全部帖子
  LookAll(){
    var that = this
    wx.request({
      url: API +'api/getallpost',
      success(res){
        console.log(res)
        if(res.data.code==200){
          that.setData({
            allContent:res.data.data
          })
        }
        if(res.data.data.length == 0){
          that.setData({
            seleted:1,
            NoAllCon:false,
            AllCon:true,
            joinClass:true,
            NojoinClass:true
          })
        }else{
          that.setData({
            seleted:1,
            NoAllCon:true,
            AllCon:false,
            joinClass:true,
            NojoinClass:true
          })
        }
        var arrNew =  that.data.allContent.map(item=>{
          // 转换时间格式
          item.post_createtime = timeHandle(item.post_createtime)
          // console.log(that.data.calssStateContent)
          that.setData({
            allContent:that.data.allContent
          })  
          
        })
      }
    })
  },
  // 是否为班长
  isBan(){
      var that = this
      wx.request({
        url: API + 'api/query_establish',
        data:{
          user_id:that.data.user_id
        },
        success(res){
          console.log(res)
          if(res.data.data.length == 0){
            that.setData({
              isban:11
            })
          }else{
            that.setData({
              isban:12,
              class_id:res.data.data.class_id
            })
            res.data.data.map(item=>{
              that.setData({
                class_id:item.class_id
              })
            })
          }
        }
      })
  },
  //  查询已加入班级
  LookAllClass(){
    var that = this
    wx.request({
      url:  API + '/api/query_post_user',
      data:{
        classmate_userid:that.data.user_id
      },
      success(res){
        console.log(res)
        if(res.data.code==200){
          that.setData({
            joinClas:res.data.data
          })
          console.log(res.data.data)
        }
        if(res.data.data.length == 0){
          that.setData({
            NoAllCon:true,
            AllCon:true,
            joinClass:true,
            NojoinClass:false
          })
        }else{
          that.setData({
            NoAllCon:true,
            AllCon:true,
            joinClass:false,
            NojoinClass:true
          })
        }
        var arrNew =  that.data.joinClas.map(item=>{
          // 转换时间格式
          item.post_createtime = timeHandle(item.post_createtime)
          console.log(item.post_createtime)
          that.setData({
            joinClas:that.data.joinClas
          })  
          
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
    var that =this
    var data = getApp().globalData.data
    var isLogin = getApp().globalData.isLogin
    console.log(data,isLogin)
    if(isLogin == 1){
      that.LookAll()
      that.setData({
        isLogin:1
      })     
    }else{
      that.setData({
        user_id:data.user_id
      })
      // that.LookAllClass()
      that.LookAll()
      that.isBan()
      
    }

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