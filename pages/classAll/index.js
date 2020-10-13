import API from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      src_a:API,
      // tab 切换
      seleted:'1',
      // 主键id
      userID:'',
      classId:'',
      // 是否加入
      joined:'',
      // 全部班级
      listAll:[],
      // 加入班级
      joinClas:{},
      // 创建的班级
      createdClass:{},
      src:'',
      join:true,
      join_no:true,
      All:false,
      created:true,
      created2:true,
      exit:true,
      classmate_classid:'',
      num_J:12,
      class_num:'',
      isban:''
  },
  // 页面滚动
  onPageScroll: function (t) {
    var that = this
    console.log(t.scrollTop)
    that.setData({
      topNav:t.scrollTop
    })
  },
  // 切换
  seletednow:function(e){
    console.log(e)
    var that= this;
    if(that.data.seleted===e.target.dataset.num){
      return false;
    }else{
      that.setData({
        seleted: e.target.dataset.num
      })
    }
    // 全部班级
    if(e.target.dataset.num==1){
      that.setData({
        All:false,
        join:true,
        join_no:true,
        created:true,
        created2:true
      })
      // 查询 全部班级
      wx.request({
          url: API +'api/query_whole',
          method:'get',
          data:{
            user_id:that.data.userID
          },
          success(res){
            console.log(res)
            that.setData({
              listAll:res.data.data,
              // seleted:1,
              All:false,
              join:true,
              join_no:true,
              created:true,
              created2:true
            })
            res.data.data.map(item=>{
              that.setData({
                classId:item.class_id,
                joined:item.joined,
              })
            })
            // 查询创建的班级
            // wx.request({
            //   url: API + 'api/query_establish',
            //   method:'get',
            //   data:{
            //     user_id:data.user_id
            //   },
            //   success(res){
            //     console.log(res)
            //     console.log(res.data.data.length)
            //     that.setData({
            //       createdClass:res.data.data
            //     })
            //     if(res.data.data.length==0){
            //       that.setData({
            //         created:true,
            //         created2:false,
            //         join_no:true
            //       })
            //     }else{
            //       that.setData({
            //         created:false,
            //         created2:true,
            //         join_no:true,
            //         join:true,
            //         All:true
            //       })
            //     }
            //   }
            // })
          }
      })
    }
    // 加入班级
    if(e.target.dataset.num==2){
      // that.joinclass()
      var isLogin = getApp().globalData.isLogin
      if(isLogin == 1){
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }else{
        wx.request({
          url: API + 'api/query_Joined',
          method:'get',
          data:{
            user_id:that.data.userID,
          },
          success(res){
            console.log(res)
            if(res.data.code==200){
              // console.log(res)
              that.setData({
                joinClas:res.data.data
              })
              console.log(that.data.joinClas)
              if(that.data.joinClas.length != 0){
                that.setData({
                  seleted:2,
                  join_no:true,
                  join:false,
                  All:true,
                  created2:true,
                  created:true,
                })
              }else{
                that.setData({
                  join_no:false,
                  join:true,
                  All:true,
                  created2:true,
                  created:true,
                })
              }
            }
          }
        })
      }
    }
    // 创建班级
    if(e.target.dataset.num==3){
      var isLogin = getApp().globalData.isLogin
      if(isLogin == 1){
        wx.redirectTo({
          url: '/pages/index/index',
        })
      }else{
        wx.request({
          url: API + 'api/query_establish',
          method:'get',
          data:{
            user_id:that.data.userID
          },
          success(res){
            console.log(res)
            console.log(res.data.data.length)
            that.setData({
              createdClass:res.data.data
            })
            if(res.data.data.length==0){
              that.setData({
                created:true,
                created2:false,
                join_no:true
              })
            }else{
              that.setData({
                created:false,
                created2:true,
                join_no:true,
                join:true,
                All:true
              })
            }
          }
        })
      }
    }
  },
  // 申请加入班级
  joinclass(e){
    console.log(e)
    var that = this
    var isLogin = getApp().globalData.isLogin
    if(isLogin == 1){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }else{
      var join = e.target.dataset.join
      if(join == 0){
        console.log('111111111111')
        // 申请加入
        wx.request({
          url: API + 'api/insertclassmate',
          method:'get',
          data:{
            classmate_userid:that.data.userID,
            classmate_classid:e.currentTarget.id
          },
          success(res){
            console.log(res)
            if(res.data.data==1){
              wx.request({
                url: API +'api/query_Joined',
                data:{
                  user_id:that.data.userID
                },
                success(res){
                  // console.log(res)
                  that.setData({
                    joinClas:res.data.data
                  })
                  // console.log(that.data.joinClas)
                  if(that.data.joinClas.length != 0){
                    that.setData({
                      seleted:2,
                      join_no:true,
                      join:false,
                      All:true,
                      created2:true,
                      created:true,
                    })
                  }else{
                    that.setData({
                      join_no:false,
                      join:true,
                      All:true,
                      created2:true,
                      created:true,
                    })
                  }
                }
              })

            }

          }
        })
      }
      if(that.data.joinClas.bhc == ''){
        that.setData({
          join_no:false,
          join:true
        })
      }
    }
  },
  // 去创建班级
  created_c(){
    wx.navigateTo({
      url: '/pages/createdClassForm/index',
    })
  },
  // 去加入班级
  gojion(){
    var that = this
    that.setData({
      seleted:1,
      All:false,
      join_no:true,
      join:true,
      created:true,
      created2:true
    })
  },
  // 创建班级跳转
  created_t(e){
    var that = this
    var classId = e.currentTarget.dataset.calssid
    wx.navigateTo({
      url: '/pages/joinClassDetail/index?classid=' +classId,
    })
  },
  //已加入班级跳转
  created_J(e){
    console.log(e)
    var that  = this
    var classmate_classid = e.currentTarget.dataset.id
    var num_J = that.data.num_J

      wx.navigateTo({
        url: '/pages/joinClassDetail/index?classmate_classid='+classmate_classid +'&num_J= '+that.data.num_J +'&calssid' + that.data.class_num +'&classid='+ classmate_classid,
      })
    
  },
  // 全部班级跳转
  cardDesc(e){
    console.log(e)
    var postId = e.currentTarget.dataset.postid
    var className = e.currentTarget.dataset.className
    var calssImg = e.currentTarget.dataset.calssImg
    var isLogin = getApp().globalData.isLogin
    if(isLogin == 1){
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }else{
      wx.navigateTo({
        url: '/pages/allclassDetail/index?postId='+ postId + '&className=' + e.currentTarget.dataset.classname + '&calssImg=' + e.currentTarget.dataset.classimg +'&calssid='+ e.currentTarget.dataset.calssid,
      })
    }
  },
// 红包
packet(){
  var that = this
  var num = that.data.isban
  wx.navigateTo({
    url: '/pages/packet/index?isban='+num +'&classid='+that.data.classId +'&num2=' +that.data.join_Class,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data = getApp().globalData.classId
    var data1 = getApp().globalData.data
    console.log(data)
    if(data == 1){
      that.setData({
        seleted:data
      })
      // 查询 全部班级
      wx.request({
        url: API +'api/query_whole',
        method:'get',
        data:{
          user_id:data1.user_id
        },
        success(res){
                console.log(res)
                that.setData({
                  listAll:res.data.data,
                  seleted:1,
                  All:false,
                  join:true,
                  join_no:true,
                  created:true,
                  created2:true
                })
                res.data.data.map(item=>{
                  that.setData({
                    classId:item.class_id,
                    joined:item.joined,
                  })
                })
        }
      })
    }
    if(data == 2){
      that.setData({
        seleted:data
      })
      wx.request({
        url: API + 'api/query_Joined',
        method:'get',
        data:{
          user_id:data1.user_id,
        },
        success(res){
          console.log(res)
          if(res.data.code==200){
            // console.log(res)
            that.setData({
              joinClas:res.data.data
            })
            console.log(that.data.joinClas)
            if(that.data.joinClas.length != 0){
              that.setData({
                seleted:2,
                join_no:true,
                join:false,
                All:true,
                created2:true,
                created:true,
              })
            }else{
              that.setData({
                join_no:false,
                join:true,
                All:true,
                created2:true,
                created:true,
              })
            }
          }
        }
      })
    }
    if(data == 3){
      that.setData({
        seleted:data
      })
      wx.request({
        url: API + 'api/query_establish',
        method:'get',
        data:{
          user_id:data1.user_id
        },
        success(res){
          console.log(res)
          console.log(res.data.data.length)
          that.setData({
            createdClass:res.data.data
          })
          if(res.data.data.length==0){
            that.setData({
              created:true,
              created2:false,
              join_no:true
            })
          }else{
            that.setData({
              created:false,
              created2:true,
              join_no:true,
              join:true,
              All:true
            })
          }
        }
      })
    }
    that.getIndex()
  },
  // 是否为班长
  isBan(){
        var that = this
        wx.request({
          url: API + 'api/query_establish',
          data:{
            user_id:that.data.userID
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
                // class_id:res.data.data.class_id
              })
              // res.data.data.map(item=>{
              //   that.setData({
              //     class_id:item.class_id
              //   })
              // })
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
    var that= this
    var data = getApp().globalData.data
    var isLogin = getApp().globalData.isLogin
    console.log(data)
    if(isLogin == 1){
      that.setData({
        userID:0,
      })
      that.getIndex()
    }else{
      that.setData({
        userID:data.user_id
      })
      that.getIndex()
      that.isBan()
    }
    
  },
  getIndex(){
      var that = this
      // 查询 全部班级
      wx.request({
        url: API +'api/query_whole',
        method:'get',
        data:{
          user_id:that.data.userID || 0
        },
        success(res){
          console.log(res)
          that.setData({
            listAll:res.data.data,
            seleted:1,
            All:false,
            join:true,
            join_no:true,
            created:true,
            created2:true
          })
          res.data.data.map(item=>{
            that.setData({
              classId:item.class_id,
              joined:item.joined,
            })
          })
          // 查询创建的班级
          // wx.request({
          //   url: API + 'api/query_establish',
          //   method:'get',
          //   data:{
          //     user_id:data.user_id
          //   },
          //   success(res){
          //     console.log(res)
          //     console.log(res.data.data.length)
          //     that.setData({
          //       createdClass:res.data.data
          //     })
          //     if(res.data.data.length==0){
          //       that.setData({
          //         created:true,
          //         created2:false,
          //         join_no:true
          //       })
          //     }else{
          //       that.setData({
          //         created:false,
          //         created2:true,
          //         join_no:true,
          //         join:true,
          //         All:true
          //       })
          //     }
          //   }
          // })
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
    var that = this
    that.created_t()
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