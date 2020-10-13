const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
import API from '../../utils/api'

Page({

  /**
   * 页面的初始数据
   */
  data: {
      flag:true,
      flag_d:true,
      flag_ID:true,
      flag_bir:true,
      // 生日选择
      years: years,
      year: date.getFullYear(),
      months: months,
      month: 2,
      days: days,
      day: 2,
      value: [9999, 1, 1],
      // 用户昵称
      nikeName:'1111',
      nikeNameNew:'',
      // 原始ID号
      ID:'',
      // 修改后id
      uploadID:'',
      // 主键id
      userID:'',
      // 存在id
      hasID:true,
      // 修改id
      upID:true,
      submitID:true,
      // 无效id
      NullID:true,
      // 修改提示
      suc_up:true,
      suc_fa:true,
      // 性别展示
      showGen:0,
      showCon:'性别未设置',
      // 生日判断
      selBir:true,
      // 头像
      src:null,
      srcNew:'',
      showSrc:true,
      // 保存成功
      sub_suc:true,
      sub_fail:true,
      user_id:'',
      is_back:0,
      is_ok:0
  },
  show:function(e){
    console.log(e)
    this.setData({
      flag:false
    })
  },
  show_bir:function(){
    this.setData({
      flag_bir:false
    })
  },
  show_d:function(){
    this.setData({
      flag_d:false
      
    })
  },
  show_ID:function(){
    var that = this
    that.setData({
      flag_ID:false,
      // is_ok:0
    })
  },
   // 修改ID
  uploadID(e){
    var that = this
    // console.log(e.detail.value)
    var uploadID = that.data.uploadID
    that.setData({
      uploadID:e.detail.value
    })
    if(e.detail.value.length==0){
      wx.showToast({
        title: '请输入ID号',
        duration:1000
      })
    }
    if(e.detail.value.length > 8){
      wx.showToast({
        title: '请输入8位字母或数字',
        duration:1500
      })
    }
  },
  hide_ID:function(){
    var that = this
    that.setData({
      flag_ID:true,
      suc_fa:false,
    })
    setTimeout(function(){
      that.setData({
        suc_fa:true,
      })
    },1000)
  },
  // id保存后提交
  hide_d:function(){
    var that = this
    var ID = that.data.ID
    if(that.data.uploadID.length==0){
      wx.showToast({
        title: '请输入ID号',
        duration:1000
      })
      return false
    }else if(that.data.uploadID.length > 9){
      wx.showToast({
        title: '字符过长',
        duration:1000
      })
      return false
    }
    else{
      wx.request({
        url: API+'api/query_user_uuid',
        method:'get',
        data:{
          user_uuid:that.data.uploadID
        },
        success(res){
          console.log(res)
          if(res.data.data===100){
            // id存在
            that.setData({
              hasID:false
            })
          }
          if(res.data.data===200){
          // 用户id不存在
              that.setData({
                 upID:false,
                 flag_ID:false
              })
              // if(is_ok == 1){
              //   that.setData({
              //     upID:true,
              //     flag_ID:false
              //   });return false;
              // }
              // that.submitID() 
          }
        }
      })
    }

  },
  stop(){
    var that = this
    that.setData({
      upID:true,
      flag_ID:false
    })
  },
  // 确认修改id
  submitID(){
    var that = this
    var uploadID = that.data.uploadID
    // if(is_ok===1){
    //   that.setData({
    //     upID:true,
    //     flag_ID:false
    //   });return false;
    // }
    wx.request({
      url: API+'api/update_user_uuid',
      method:'get',
      data:{
        user_id:that.data.userID,
        user_uuid:that.data.uploadID
      },
      success(res){
        console.log(res)
        if(res.data.data==1){
          // id修改成功
         that.setData({
          flag_ID:true,
          hasID:true,
          suc_up:false,
         })
         setTimeout(function(){
           that.setData({
            suc_up:true,
           })
         },1000)
        //  that.setData({
        //   ID:uploadID
        // })
        }else if(res.data.data==111 ){
          // 只有一次
          that.setData({
            flag_ID:true,
            upID:true,
            suc_fa:false,
            // is_ok:1
            // uploadID:that.data.ID
          })
          setTimeout(function(){
            that.setData({
              suc_up:true
            })
          },1500)

        }else if(res.data.data==222){
            // id被占用
            that.setData({
              flag_ID:false,
              hasID:false,
            })
        }else if(res.data.data==555){
          // 修改失败
          that.setData({
            suc_fa:false,
            flag_ID:false,
            NullID:false
          })
          setTimeout(function(){
            that.setData({
              suc_fa:true,
            })
          },2000)
        }
      }

    })
    // that.setData({
    //   flag_ID:true,
    //   upID:true,
    //   suc_up:false
    // })
    // setTimeout(function(){
    //   that.setData({
    //    suc_up:true,
    //   })
    // },2000)

  },
  konw(){
    var that = this
    that.setData({
      hasID:true
    })
  },
  // 无效id
  konwNull(){
    var that = this
    that.setData({
      NullID:true,
      flag_ID:true
    })
  },
  // 性别
  hide_g:function(){
    var that = this
    console.log(that.data.showGen)
    this.setData({
      flag:true
    })
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
  },
  // 选择性别
  sel_gen(e){
    console.log(e.currentTarget.dataset.sex)
    var that =this
    that.setData({
      showGen:e.currentTarget.dataset.sex
    })
  },

  hide_bir:function(){
    this.setData({
      flag_bir:true
    })
  },
  hide_name(){
    var that = this
    that.setData({
      flag_d:true
    })
  },
  // 修改用户昵称
  uploadName(e){
    var that = this
    that.setData({
      nikeNameNew:e.detail.value
    })
    if(e.detail.value.length >= 10){
      wx.showToast({
        title: '昵称最多输入10个字',
        duration:1500
      })
    }
    if(e.detail.value.length ==0){
      wx.showToast({
        title: '请输入昵称',
        duration:1500
      })
    }
  },
  // 提交用户昵称
  hide_n(){
    var that = this
    var nikeNameNew = that.data.nikeNameNew
    that.setData({
      nikeName:nikeNameNew
    })
    if(that.data.nikeName===''){
      wx.showToast({
        title: '请输入昵称',
        duration:1000
      })
      that.setData({
        flag_d:false,
        suc_up:true,

      })
      setTimeout(function(){
        that.setData({
         suc_up:true,
        })
      },1000)
      return 
    }else{
      that.setData({
        flag_d:true,
        suc_up:false
      })
      setTimeout(function(){
        that.setData({
         suc_up:true,
        })
      },1000)
    }

  },
  // 获取生日
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  // 生日
  hide_bir(){
    var that = this
    that.setData({
      flag_bir:true,
      selBir:false
    })
    
  },
  // 更改头像
  show_img(){
    var that = this
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          // showSrc:false,
          srcNew:tempFilePaths,   
          src: tempFilePaths[0],     
          is_back:0
        })
        that.formSub();
        // that.getIndex();
        console.log(tempFilePaths[0])
        console.log(that.data.src)
      }
    })
  },

  // 保存提交表单
  formSub(){
    var that = this
    var bir = that.data.year+'-'+that.data.month+'-'+that.data.day
    if(this.data.srcNew[0] == null){
      console.log(that.data.is_back)
      // if(that.data.is_back==1){
      //   wx.navigateBack({
      //         delta:1,
      //   });return false;
      // }
      wx.request({
        url: API+'api/update_user_information',
        method:'get',
        data:{
          user_id:that.data.userID,
          user_nickname:that.data.nikeName,
          user_gender:that.data.showGen,
          user_birth:bir
        },
        success(res){
          console.log(res)
          var data = getApp().globalData.data
          if(res.data.data==1){
            that.setData({
              sub_suc:false,
              // is_back:1
            })
            wx.navigateBack({
                delta:1,
            });
            // console.log(that.data.is_back)
            setTimeout(function(){
              that.setData({
                sub_suc:true
              })
            },1000)
          }else{
            that.setData({sub_fail:false})
            setTimeout(function(){
              that.setData({
                sub_fail:true
              })
            },1000)
          }
        }
      })
    }else{
      if(that.data.is_back==1){
        wx.navigateBack({
              delta:1,
        });return false;
      }
      wx.uploadFile({
        url: API+'api/update_user_avatar', 
        filePath: that.data.srcNew[0],
        name: 'file',
        formData:{
          "user_id":that.data.userID,
          "user_nickname":that.data.nikeName,
          "user_gender":that.data.showGen,
          "user_birth":bir,
        },
        success(res){
          // var res1 = JSON.stringify(res)
          var jsonObj = JSON.parse(res.data);
          var data = getApp().globalData.data
          var Src = API + data.user_avatar
          console.log(99);
          if(jsonObj.data==1){
            that.setData({
              sub_suc:false,
              is_back:1
            })

            setTimeout(function(){
              that.setData({
                sub_suc:true
              })
            },1000)
          }else{
            that.setData({sub_fail:false})
            setTimeout(function(){
              that.setData({
                sub_fail:true
              })
            },1000)
          }
          that.getIndex();
        }
      })  
    }
  },
  // 生日格式化
  // birth(obj){
  //   var data = obj.split('-')
  //   return 
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data = getApp().globalData.data 
    console.log(data)
    var Bir = data.user_birth.split('-')
    var Src = API + data.user_avatar
    // 渲染头像
    if(data.user_avatar!==""){
      that.setData({
        showSrc:false,
        src: Src,
      })
    }
    that.setData({
      nikeName:data.user_nickname,
      uploadID:data.user_uuid,
      userID:data.user_id,
      ID:data.user_uuid,
      showGen:data.user_gender
    })
    // 渲染生日
    if(Bir.length >= 3){
      that.setData({
        selBir:false,
        year:Bir[0],
        month:Bir[1],
        day:Bir[2],
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
    this.getIndex();
  },
  getIndex:function(){
    var that = this
    var data = getApp().globalData.data 
    console.log(data)
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
            uploadID:res.data.data.user_uuid,
            userID:res.data.data.user_id,
            ID:res.data.data.user_uuid,
          })
        }
        var Bir = data.user_birth
        var Src = API + res.data.data.user_avatar
        console.log(Src)
         // 渲染生日
        if(Bir==''){
         that.setData({
          selBir:true
         })
        }else{
          var Bir1 = Bir.split('-')
          that.setData({
            selBir:false,
            year:Bir1[0],
            month:Bir1[1],
            day:Bir1[2],
          })
        }
        // 渲染头像
        if(res.data.data.user_avatar != null){
          that.setData({
            // showSrc:true,
            showSrc:true,
            src: Src,
          })
          console.log(that.data.src)
        }else{
          that.setData({
            showSrc:false
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