import API from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 帖子id
    postId:null,
    // 图片
    Srcs:[],
    Src:API,
    Src_new:[],
    classId:null,
    classID:{},
    userID:'',
    content:'',
    content_new:'',
    
    date:null,
    addimg:true,
    maxlength:9,
    // 成功回调
    is_ok:null,
    suc:null,
    post_id:null,
    // 退出弹窗
    upID:true,
    // 内容不足
    NullID:true,
    post_imgid:'',

    // 表情
    isShow: true,//控制emoji表情是否显示
    isLoad: true,//解决初试加载时emoji动画执行一次
    isLoading: true,//是否显示加载数据提示
    cfBg: false,
    emojiChar: "😋-😌-😍-😏-😜-😝-😞-😔-😪-😭-😁-😂-😃-😅-😆-👿-😒-😓-😔-😏-😖-😘-😚-😒-😡-😢-😣-😤-😢-😨-😳-😵-😷-😸-😻-😼-😽-😾-😿-🙊-🙋-🙏-✈-🚇-🚃-🚌-🍄-🍅-🍆-🍇-🍈-🍉-🍑-🍒-🍓-🐔-🐶-🐷-👦-👧-👱-👩-👰-👨-👲-👳-💃-💄-💅-💆-💇-🌹-💑-💓-💘-🚲",
    //0x1f---
    emoji: [
      "60a", "60b", "60c", "60d", "60f",
      "61b", "61d", "61e", "61f",
      "62a", "62c", "62e",
      "602", "603", "605", "606", "608",
      "612", "613", "614", "615", "616", "618", "619", "620", "621", "623", "624", "625", "627", "629", "633", "635", "637",
      "63a", "63b", "63c", "63d", "63e", "63f",
      "64a", "64b", "64f", "681",
      "68a", "68b", "68c",
      "344", "345", "346", "347", "348", "349", "351", "352", "353",
      "414", "415", "416",
      "466", "467", "468", "469", "470", "471", "472", "473",
      "483", "484", "485", "486", "487", "490", "491", "493", "498", "6b4"
    ],
    emojis: [],//qq、微信原始表情
    alipayEmoji: [],//支付宝表情
    created1:1
  },
  // 修改内容
  upload_c(e){
    console.log(e)
    var that = this
    that.setData({
      content_new:e.detail.value
    })
  },
  // 选择图片
  img_up(){
    var that = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths)
        that.setData({
          Src_new:tempFilePaths
        })
      }
    })
  },
  // 移除图片
  hideImg(e){
    console.log(e)
    var that = this
    var src = that.data.Srcs
    var index = e.currentTarget.dataset.index;
    var item_imgid = e.currentTarget.dataset.imgid
    src.splice(index,1)
    console.log(item_imgid)
    that.data.post_imgid += item_imgid + ","
    console.log(that.data.post_imgid)
    that.setData({
      Srcs: src,
      post_imgid:that.data.post_imgid
     });
     if(src.length >0){
       that.setData({
        addimg:false
       })
     }else{
      that.setData({
        addimg:true
       })
     }
  },
  hideImg_new(e){
    var that = this
    var Src_new = that.data.Src_new
    var index = e.currentTarget.dataset.index;
    Src_new.splice(index,1)
    that.setData({
      Src_new:Src_new
     });
  },
  //修改帖子
  uploadFile(){
    var that = this
    var Srcs = that.data.Srcs
    var content = that.data.content_new
    if( that.data.content_new.length < 10){
      that.setData({
         NullID:false
      })
      return false
    }
    if(that.data.Src_new.length == 0){
      wx.request({
        url: API + 'api/updatepost',
        data:{
          post_id: that.data.postId,
          post_content:content,
          post_imgid:that.data.post_imgid
        },
        success(res){
          console.log(res)  
          if(res.data.data ==1 ){
            var num = that.data.created1
            wx.redirectTo({
              url: '/pages/joinClassDetail/index?created1='+ num,
             
            })
          }
        }
      })
    }else{
      wx.request({
        url: API + 'api/updatepost',
        data:{
          post_id: that.data.postId,
          post_content:content,
          post_imgid:that.data.post_imgid
        },
        success(res){
          console.log(res)
          if(res.data.data == 1 ){
            that.uploadimg({
              url:API+ 'api/addpostimg',
              path:that.data.Src_new,
              formData:{
                'post_id': that.data.postId,
              },
            })
          }
        }
      })
      if(that.data.is_ok== that.data.success){
        wx.navigateTo({
          url: '/pages/joinClassDetail/index',
          success(res){
            res.eventChannel.emit('created1',{data:1})
          }
        })
      }else{
        wx.showToast({
          title: '发布失败',
          duration:1000
        })
      }
    }
   

   
  },
  //多张图片上传
  uploadimg(data){
    var that=this,
        i=data.i?data.i:0,//当前上传的哪张图片
        success=data.success?data.success:0,//上传成功的个数
        fail=data.fail?data.fail:0;//上传失败的个数
      wx.uploadFile({
           url: data.url, 
           filePath: data.path[i],
           name: 'file',
           formData:data.formData,//这里是上传图片时一起上传的数据
           success: (resp) => {
              success++;//图片上传成功，图片上传成功的变量+1
              console.log(resp)
              // console.log(data)
              var data = JSON.parse(resp.data)
              that.setData({
                is_ok:success
              })
              console.log(that.data.is_ok)
              // console.log(i);
           },
           fail: (res) => {
               fail++;//图片上传失败，图片上传失败的变量+1
               console.log('fail:'+i+"fail:"+fail);
           },
           complete: () => {
              //  console.log(i);
               i++;//这个图片执行完上传后，开始上传下一张
            if(i==data.path.length){ 
              //当图片传完时，停止调用    
              console.log('执行完毕');
              console.log('成功：'+success+" 失败："+fail);
           }else{//若图片还没有传完，则继续调用函数
               console.log(i);
               data.i=i;
               data.success=success;
               data.fail=fail;
               that.uploadimg(data);
           }     
           }
      });
   },
  //关闭按钮
  close(){
    // wx.navigateBack({
    //   delta:1
    // })
    this.setData({
      upID:false
    })
  },
  // 点错了
  stop(){
    var that = this
    that.setData({
      upID:true
    })
  },
  // 确认退出
  submitID(){
    var that = this
    that.setData({
      upID:true
    })
    wx.navigateBack({
      delta:1
    })
  },
  // 知道了
  konwNull(){
    this.setData({
      NullID:true
    })
  },
   //点击表情显示隐藏表情盒子
   emojiShowHide: function () {
    this.setData({
      isShow: !this.data.isShow,
      // isLoad: false,
      // cfBg: !this.data.false
    })
  },
  //表情选择
  emojiChoose (e) {
    // console.log(e)
    //当前输入内容和表情合并
    this.setData({
      content: this.data.content_new + e.currentTarget.dataset.emoji
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var data = getApp().globalData.data
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('postId',function(data){
      that.setData({
        postId:data
      })
      wx.request({
        url: API + 'api/postxq',
        data:{
          post_id:data
        },
        success(res){
          console.log(res)
          var Data = res.data.data
          if(res.data.code == 200){
            that.setData({
              content:Data.post_content,
              Srcs:Data.post_postimg
            })

            if(that.data.Srcs.length > 0){
              that.setData({
                addimg:false
              })
            }
          }
        }
      })
    })
     // 表情
     var em = {},  emChar = that.data.emojiChar.split("-");
     // console.log(emChar)
     that.data.emoji.map((item,index)=>{
       em = {
         char : emChar[index],
         emoji:'0x1f' + item
       }
       that.data.emojis.push(em)
     })
     // console.log(that.data.emojis)
     that.setData({
       emojis:that.data.emojis
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