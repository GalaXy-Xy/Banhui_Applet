import API from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      seleted:1,
      seleted_z:3,
      src:API ,
      // 规则
      guize:true,
      //
      userId:'',
      calssId:'',
      calssId_c:'',
      // 本班排行
      class_benban:[],
      // 总排行榜 同学
      calss_All:[],
      // 总排行榜 班级
      banji_ALL:[],
      Imgs:false,
      // 斑币
      myClock:'',
      clock_All:'',
      class_name:'',
      class_img:'',
      // 广告
      guang:true,
      toast:true,
      // 性别
      showGen:true,
      NoGen:true,
      Gender:'',
      nantu:true,
      nvtu:true,
      showGen_all:true,
      NoGen_all:true,
      nvtu_All:true,
      nantu_all:true,
      // 广告图片
      src_g:'',
      // 
      banbi_all:true,
      // 进度条
      percent:'',
      // 次数
      count_now:'',
      jl_maxcount:'',
      Nocount:true
  },
  // 次数用完
  konw(){
    var that = this
    that.setData({
      Nocount:true
    })
  },
  // 增加斑币
  add_banbi(){
    var that = this
    // 次数用完
    if( that.data.count_now == that.data.jl_maxcount){
          that.setData({
            Nocount:false,
            guang:true
          })
          return false
    }else{
          that.setData({
            Nocount:true,
            guang:false
          })
          // 随机广告
          wx.request({
            url: API +'api/guanggao',
            success(res){
              // console.log(res)
              if(res.data.code==200){
                that.setData({
                  src_g:res.data.data.video
                })
              }
    
            }
          })
    }
  },

  // 广告
  close_gg(){
    var that = this
    that.setData({
      guang:true,
      toast:false
    })
    setTimeout(function(){
      that.setData({
        toast:true
      })
    },3000)
    
    wx.request({
      url: API + 'api/updatejilu',
      data:{
        user_id :that.data.userId, 
        class_id  :that.data.calssId
      },
      success(res){
        console.log(res)
        if(res.data.data==1){
          console.log(that.data.percent)
          // that.setData({
          //   percent:that.data.percent*10
          // })
          that.getIndex()
        }
      }
    })
  },
  seletednow:function(e){
    console.log(e.target)
    var that = this
    if(that.data.seleted === e.target.dataset.num){
      return false
    }else{
      that.setData({
        seleted: e.target.dataset.num
      })
    }
  },
  // 二级切换
  selecte_z(e){
    // console.log(e.target)
    var that = this
    if(that.data.seleted_z === e.target.dataset.num){
      return false
    }else{
      that.setData({
        seleted_z: e.target.dataset.num
      })
    }
  },
  // 查看规则
  look_g(){
    var that = this
    that.setData({
      guize:false
    })
  },
  close_g(){
    var that = this
    that.setData({
      guize:true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(options)
    if(options.clock == ''){
      that.setData({
        calssId:options.calssId
      })
      that .getIndex()
    }else{
      that.setData({
        calssId:options.clock
      })
      that .getIndex()
    }

  },
  getIndex(){
    var that = this
    var Data = getApp().globalData.data
    // console.log(Data)
    that.setData({
      userId:Data.user_id
    })
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.on('clock', function(data) {
    //   console.log(data)
    //   that.setData({
    //     calssId:data
    //   })
    // })
    // 获取我的斑币
    wx.request({
      url: API +'api/userbanbi',
      data:{
        user_id: that.data.userId,
      },
      success(res){
        console.log('我的斑币')
        console.log(res)
        if(res.data.code == 200){
          that.setData({
            myClock:res.data.data.user_gold
          })
        }

      }
    })
    // 查询班级金币
    wx.request({
      url: API + 'api/class_gold',
      data:{
        classmate_classid:that.data.calssId
      },
      success(res){
        console.log('班级的斑币')
        console.log(res)
        if(res.data.code==200){
          that.setData({
            clock_All:res.data.data.sum_gold,
            class_name:res.data.data.bhc.class_name,
            class_img:res.data.data.bhc.class_avatar
          })
        }

      }
    })
    // 获取每日可用机会
    wx.request({
      url: API + 'api/banhuijilu',
      data:{
        user_id: that.data.userId,
        class_id:that.data.calssId
      },
      success(res){
        console.log('每日可用机会')
        console.log(res)
        var count = res.data.data.jl_count
        var max = res.data.data.jl_maxcount
        if(res.data.code==200){
          that.setData({
            count_now:res.data.data.jl_count,
            jl_maxcount:res.data.data.jl_maxcount,
            percent:100 / max * count
          })
        }
        // if(res.data.data.jl_count == 10){
        //   that.setData({
        //     guang:true,
        //     Nocount:false
        //   })
        // }
        // console.log(that.data.percent)
      }
    })
    // 获取本班级学生排行
    wx.request({
      url: API +'api/classRanking',
      data:{
        classmate_classid:that.data.calssId
      },
      success(res){
        console.log('获取本班级学生排行')
        console.log(res)
        if(res.data.code==200){
          that.setData({
            class_benban:res.data.data
          })
          if(res.data.data.length >3){
            that.setData({
              Imgs:true
            })
          }else(
            that.setData({
              Imgs:false
            })
          )
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
    // 查询所有班级的同学排行
    wx.request({
      url: API +'api/All_User_gold',
      success(res){
        console.log('查询所有班级的同学排行')
        console.log(res)
        if(res.data.code==200){
          that.setData({
            calss_All:res.data.data
          })
          if(res.data.data.length >3){
            that.setData({
              Imgs:true
            })
          }else{
            that.setData({
              Imgs:false
            })
          }
            // 性别
          res.data.data.map(item=>{
            item.bhuser.map(item=>{
              if(item.user_gender=1){
                // 女
                that.setData({
                  Gender:1,
                  showGen_all:true,
                  NoGen_all:false,
                  nvtu_All:false,
                  nantu_all:true
                })
              }else if(item.user_gender=0){
                that.setData({
                  Gender:0,
                  NoGen_all:true,
                  nvtu_All:true,
                  nantu_all:true
                })
              }else{
                that.setData({
                  Gender:2,
                  showGen_all:false,
                  NoGen_all:false,
                  nvtu_All:true,
                  nantu_all:false
                })
              }
            })
          })
        }
      }
    })
    // 查询所有年级的排行
    wx.request({
      url: API +'api/All_class_gold',
      success(res){
        console.log('查询所有年级的排行')
        console.log(res)
        if(res.data.code==200){
          that.setData({
            banji_ALL:res.data.data
          })
          if(res.data.data.length >3){
            that.setData({
              Imgs:true
            })
          }
        }
      }
    })
    // 查询用户是否为班长
    wx.request({
      url: API +'api/query_user_information',
      data:{
        user_id:that.data.userId
      },
      success(res){
        // console.log(res)
        // 同学0 
        if(res.data.code == 200){
          if(res.data.data.user_role ==0){
            that.setData({
              banbi_all:true
            })
          }else{
            that.setData({
              banbi_all:false
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