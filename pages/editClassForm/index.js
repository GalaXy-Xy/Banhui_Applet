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
      classId:'',
      // 头像：
      src:'',
      src1:'',
      // 班级名称内容
      classTitle:'',
      classTitleNew:'',
      // 班级描述内容
      desc:'',
      descNew:'',
      // 创建班级提示
      flag_cre_n:true,
      // 退出
      exit:true,
      // 禁止提交
      is_login:1,
      num:0,
      // 重复提交
      is_form:1,
      // 
      bottom:''
    },
    // 键盘事件
    blur(e){
      var that = this;
      that.setData({
        bottom: 0
      })
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
            src1:tempFilePaths,
            src:tempFilePaths
          })
          console.log(tempFilePaths)
          console.log(that.data.src1)
          console.log(that.data.src)
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
        wx.showToast({
          title: '请不要点击多次',
          duration:1000
        })
      }
    },
    created(){
      var that = this
      that.setData({
        is_login:1
      })
      console.log(that.data.src1)
      console.log(that.data.src)
      if(that.data.src == that.data.src1){
        console.log('11111111111111')
        wx.uploadFile({
          header:{
            'content-type':"application/x-www-form-urlencoded"
          },
          url: API+'api/update_classService', 
          filePath: that.data.src[0],
          name: 'file',
          formData: {
            'class_id': that.data.classId,
            'class_name':that.data.classTitleNew,
            'class_desc':that.data.descNew
          },
          success (res){
            var data = JSON.parse(res.data);
            console.log(res)
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
      }else{
        console.log('2222222222')
        wx.request({
          url:  API+'api/update_classServicebudai',
          data:{
            class_id: that.data.classId,
            class_name:that.data.classTitleNew,
            class_desc:that.data.descNew,
            // file:that.data.src
          },
          success (res){
            console.log(res)
            // var data = JSON.parse(res.data);
           
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
        // wx.uploadFile({
        //   header:{
        //     'content-type':"application/x-www-form-urlencoded"
        //   },
        //   url: API+'api/update_classService', 
        //   filePath: that.data.src,
        //   name: 'file',
        //   formData: {
        //     'class_id': that.data.classId,
        //     'class_name':that.data.classTitleNew,
        //     'class_desc':that.data.descNew
        //   },
        //   success (res){
        //     var data = JSON.parse(res.data);
        //     console.log(res)
        //    if(data.data==1){
        //      var num = that.data.num
        //     that.setData({
        //       flag_cre_n:true,
        //       is_login:2
        //     }),
        //     wx.redirectTo({
        //       url: '/pages/joinClassDetail/index?codeA='+num,
        //     })
        //     setTimeout(function(){
        //       that.setData({
        //         flag_cre_n:false
        //       })
        //     },1500)
        //    }
        //   }
        // })
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
    var that = this
    that.setData({
      flag_d:true,
      exit:true,
      flag_n:true,
      classTitle:that.data.classTitle,
      desc:that.data.desc
    })
  },
  // 获取班级名称内容
  focus_n(e){
      var that = this
      // console.log(e.detail.value)
      that.setData({
        classTitleNew:e.detail.value,
        classTitle:e.detail.value
      })
      // if(e.detail.value < 0){
      //   wx.showToast({
      //     title: '请输入10个字符',
      //   })
      // }
  },
  // 获取班级描述内容
  focus_d(e){
      var that = this
      // console.log(e)
      that.setData({
        descNew:e.detail.value
      })
  },
  // 班级名称
  show_n:function(){
    this.setData({
      flag_n:false
    })
  },
  hide_n:function(){
    var that = this
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  　var maxPos = $chars.length;
  　var pwd = '';
    var len = 16
  　for (var i = 0; i < len; i++) {
  　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  　}
    if(that.data.classTitleNew.length > 16){
      wx.showToast({
        title: '字符过长',
        duration:1500
      })
      return false
    }else{
      if(that.data.classTitleNew.length == 0){
        this.setData({
          flag_n:true,
          classTitle:pwd
        })
      }else{
        that.setData({
          flag_n:true,
          classTitle:that.data.classTitleNew
        })
      }
    }
  },
  // 退出编辑
  hide_tit(){
    var that = this
    that.setData({
      exit:false,
      flag_n:false,
      
    })
  },
  // 班级描述
  show_d(){
    this.setData({
      flag_d:false
    })
  },
  hide_d(){
    var that = this
    this.setData({
      flag_d:true,
      desc:that.data.descNew
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
   // 二维码
  show_c:function(){
    var that= this
    var name = that.data.classTitle
    // 二维码下载提示
    // this.setData({
    //   flag_code:false
    // })
    wx.navigateTo({
      url: '/pages/createdCode/index?calssNmae='+ name +'&calssImg='+that.data.src +'&classId='+that.data.classId ,
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
    // console.log(data)
    that.setData({
      userID:data.user_id,
      // is_login:2
    })
    wx.request({
      url: API +'api/query_establish',
      data:{
        user_id:data.user_id
      },
      success(res){
        console.log(res)
        res.data.data.map(item=>{
          that.setData({
            src: API + item.class_avatar,
            classTitle:item.class_name,
            desc:item.class_desc,
            classId:item.class_id
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