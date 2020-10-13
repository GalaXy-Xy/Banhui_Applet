import API from '../../utils/api'
import {timeHandle} from '../../utils/date'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      API:API,
      seleted:1,
      classId:'',
      userid:'',
      name:'',
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
       class_benban:[],
        // 性别
      showGen:true,
      NoGen:true,
      Gender:'',
      nantu:true,
      nvtu:true,
      img:'',
      showGen_all:true,
      NoGen_all:true,
      nvtu_All:true,
      nantu_all:true,
      mingci:0,
      banbi:'',
       // 我的帖子
       card_my:[],
       NoCardMy:true,
       Mycard:true,
       // 加入的班级
       classAll:[],
       // 有无加入班级
       Noclass:true,
       class_join:true,
       Imgs:null
  },
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data1 = JSON.parse(options.user)
    var data = getApp().globalData.data
    console.log(data1)
    data1.map(item=>{
      that.setData({
        userid:item.user_id,
        name:item.user_nickname,
        showGen:item.user_gender,
        ID:item.user_uuid,
        birth:item.user_birth,
        img:item.user_avatar
      })
          // 渲染性别
    if(item.user_gender==1){
      that.setData({
        showCon:'男'
      })
    }
    if(item.user_gender==2){
      that.setData({
        showCon:'女'
      })
    }
    if(item.user_gender==0){
      that.setData({
        selBir:true
      })
    }
    // 渲染星座
    if(item.user_birth == null){
      that.setData({
        xingzuo:''
      })
    }else{
      var Bir = item.user_birth.split('-')
      console.log(Bir)
      console.log(Bir[1])
      console.log(Bir[2])
      var xz = item.user_birth.substr(Bir[1] * 2 - (Bir[2] < that.data.arr[Bir[1] - 1] ? 2 : 0), 2)
      that.setData({
        xingzuo:xz
      })
    }
      // 头像
      if(item.user_avatar!= ""){
        that.setData({
          showSrc:false,
          src:API + item.user_avatar,
        })
      }else{
        that.setData({
          showSrc:true,
          
        })
      }
    })

    that.setData({
      classId:options.classId,
    })
    // 获取本班级学生排行
    wx.request({
      url: API +'api/classRanking',
      data:{
        classmate_classid:options.classId
      },
      success(res){
        console.log('获取本班级学生排行')
        console.log(res)
        console.log(data.user_id)
        if(res.data.code==200){
          for(var index in res.data.data){
            console.log(res.data.data[index].bhuser[0].user_id+"--------------")
            if(res.data.data[index].bhuser[0].user_id == data1[0].user_id ){
                that.setData({
                  mingci: Number(parseInt(index)+1),
                  banbi: res.data.data[index].bhuser[0].user_gold
                })
            }
            if(index > 3){
              console.log('1名')
              that.setData({
                Imgs:true
              })
            }else{
              that.setData({
                Imgs:false
              })
            }
          }
          
          that.setData({
            class_benban:res.data.data
          })
          // if(res.data.data.length >4){
          //   that.setData({
          //     Imgs:true
          //   })
          // }else{
          //   that.setData({
          //     Imgs:false
          //   })
          // }
          // 性别
          res.data.data.map(item=>{
            item.bhuser.map(item1=>{
              console.log(item1.user_gender)
              if(item1.user_gender==1){
                // 女
                that.setData({
                  // Gender:'女',
                  showGen:true,
                  nvtu:false,
                  nantu:true,
                  NoGen:false
                })
              }
               if(item1.user_gender==2){
                that.setData({
                  showGen:false,
                  nantu:false,
                  nvtu:true,
                  NoGen:false
                }) 
              }
              if(item1.user_gender==0){
                that.setData({
                  Gender:'',
                  NoGen:true,
                  nantu:true,
                  nvtu:true,
                })
              }
            })
          })

        }
    
      }
    })

    // 查询帖子
    wx.request({
      url:  API +'api/usergetpost',
      data:{
        post_userid:data1[0].user_id
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
        user_id:data1[0].user_id
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