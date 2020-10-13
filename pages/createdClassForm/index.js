import API from '../../utils/api'
import {throttle,debounce} from '../../utils/jieliu'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      flag_n:true,
      flag_code:true,
      flag_d:true,
      // 主键id
      userID:'',
      // 头像：
      src:'',
      // 班级名称内容
      classTitle:'',
      // 班级描述内容
      desc:'',
      // 创建班级提示
      flag_cre_n:true,
      // 退出
      exit:true,
      // 禁止提交
      is_login:1,
      num:0,
      // 重复提交
      is_form:1
    },
    // 更改头像并提交
    uploadImg(){
      var that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          const tempFilePaths = res.tempFilePaths
          that.setData({
            src:res.tempFilePaths
          })
          console.log(tempFilePaths)
        }
      })
    },
    // 提交
    debounce(){
      var that = this
      var date = new Date()
      var m = date.getMinutes().toString();//获得当前分钟数
      console.log('提交外面的')
      console.log(m)
      console.log(date.getMinutes())
      //开始缓存池中没有分钟数，当前分钟数肯定不等于缓存中的分钟数，当前可以执行
      if (m != wx.getStorageSync('m')){
          wx.setStorageSync('m', m)//把分钟数放到缓存
          //要做的事情，提交啊，点击啊等等
          that.created()
        }
        else
      {
          //当发生了1分钟内多次点击等事件，弹窗提示或者做别的操作。
        // wx.showToast({
        //   title: '请不要点击多次',
        //   duration:1000
        // })
        console.log('请不要点击多次')
      }
    },
    created(){
      var that = this
      that.setData({
        is_login:1
      })
      if(that.data.src == ''){
        wx.request({
          url: API+'api/add_class',
          data:{
            // file:null,
            user_id: that.data.userID,
            class_name:that.data.classTitle,
            class_desc:that.data.desc
          },
          success (res){
            // var data = JSON.parse(res.data);
            console.log(res)
          if(res.data.data==1){
            var num = that.data.num
            that.setData({
              flag_cre_n:true,
              is_login:2
            }),
            wx.redirectTo({
              url: '/pages/joinClassDetail/index?codeA='+num,
            })
            setTimeout(function(){
              that.setData({
                flag_cre_n:false
              })
            },1500)
          }
          }
        })
      }else{
        wx.uploadFile({
            header:{
              'content-type':"application/x-www-form-urlencoded"
            },
            url: API+'api/add_class', 
            filePath: that.data.src[0],
            name: 'file',
            formData: {
              'user_id': that.data.userID,
              'class_name':that.data.classTitle,
              'class_desc':that.data.desc
            },
            success (res){
              var data = JSON.parse(res.data);
              console.log(data)
            if(data.data==1){
              var num = that.data.num
              that.setData({
                flag_cre_n:true,
                is_login:2
              }),
              wx.redirectTo({
                url: '/pages/joinClassDetail/index?codeA='+num,
              })
              setTimeout(function(){
                that.setData({
                  flag_cre_n:false
                })
              },1500)
            }
            }
        })
      }
    
    },


  stop(){
    var that = this
    that.setData({
      exit:true,
      flag_d:false,
      flag_n:false
    })
  },
  submitID(){
    this.setData({
      flag_d:true,
      exit:true,
      flag_n:true,
      classTitle:'',
      desc:''
    })
  },
  // 获取班级名称内容
  focus_n(e){
      var that = this
      // console.log(e.detail.value)
      that.setData({
        classTitle:e.detail.value
      })

      if(e.detail.value >= 10){
        wx.showToast({
          title: '请输入10个汉字',
          duration:1500
        })
      }
  },
  // 获取班级描述内容
  focus_d(e){
      var that = this
      // console.log(e)
      that.setData({
        desc:e.detail.value
      })
      if(that.data.desc.length == 0){
        that.setData({
          desc:'请输入班级描述'
        })
      }
  },
  // 班级名称
  show_n:function(){
    this.setData({
      flag_n:false
    })
  },
  hide_n:function(){ 
      this.setData({
        flag_n:true
      })
  },
  // 退出编辑
  hide_tit(){
    var that = this
    that.setData({
      exit:false,
      flag_n:false
    })
  },
  // 班级描述
  show_d(){
    this.setData({
      flag_d:false
    })
  },
  hide_d(){
    this.setData({
      flag_d:true
    })
  },
   // 退出编辑
  exit_d(){
    this.setData({
      flag_d:false,
      exit:false
    })
  },
  hide_c:function(){
    this.setData({
      flag_code:true
    })
  },
  show_c:function(){
    // 二维码下载提示
    // this.setData({
    //   flag_code:false
    // })
    wx.navigateTo({
      url: '/pages/createdCode/index',
    })
  },
 
  hide:function(){
    this.setData({
      flag:true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this
    var data = getApp().globalData.data
    console.log(data)
    that.setData({
      userID:data.user_id,
      is_login:2
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
    var that = this
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    　var maxPos = $chars.length;
    　var pwd = '';
      var len =  16
    　for (var i = 0; i < len; i++) {
    　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　}
    if(that.data.classTitle.length == 0){
      that.setData({
        classTitle:pwd,
      })
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