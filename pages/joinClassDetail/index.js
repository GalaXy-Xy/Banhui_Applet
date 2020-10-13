import API from '../../utils/api'
import {timeHandle} from '../../utils/date'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      topNav:0,
      // 点击退出 编辑的切换
      Closed:true,
      flag:true,
      classTitle:'' , 
      flag_n:true,
      // 主键id
      userID:'',
      // 班级id
      classId:'',
      classId_c:'',
      // 头像
      src: API,
      // 班级信息
      calssMeg:[],
      JoincalssMeg:{},
      desc_new:'',
      // 创建成功
      flag_cre_n:true,
      // 发布成功
      fabu:true,
      // 全部帖子
      calssStateContent:[],
      srcImg:'',
      //没有neir
      nocon:false,
      // 同学列表头像
      classLsitImg:[],
      // 用户id
      classmate_classid	:'',
      isJoin:true,
      isCreated:true,
      Data:'',
      Data2:'',
      num_J:'',
      Data1:'',
      num_a:'',
      //用户头像top5
      headImg:[],
      // 是否为班长
      num_b:'',
      // 创建帖子
      tiezi_c:true,
    content:'',
    Srcs:[],
    date:null,
    addimg:true,
    maxlength:9,
    // 发布按钮颜色
    btn_color:true,
    // 成功回调
    is_ok:null,
    suc:null,
    post_id:null,
    // 退出弹窗
    upID:true,
    // 内容不足
    NullID:true,

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
    codeC:1
    },
    // 退出班级
    removeClass(){
      var that= this
      wx.request({
        url: API + 'api/delclassmate',
        data:{
          classmate_userid: that.data.userID,
          classmate_classid:that.data.Data
        },
        success(res){
          console.log(res)
          if(res.data.data ==1){
            wx.switchTab({
              url: '/pages/classAll/index',
            })
          }else{
            wx.showToast({
              icon:'loading',
              title: '无法退出',
              duration:1500
            })
          }
        }
      })
    },
    // 跳转斑币
    Clock_banbi(){
      var that = this
      var classmate_classid = that.data.Data
      // var calssId = that.data.classId
      console.log(classmate_classid)
      wx.navigateTo({
        url: '/pages/Clock_banbi/index?clock='+classmate_classid +'&calssId='+ that.data.classId,
        // success(res){
        //   res.eventChannel.emit('clock',classmate_classid)
        // }
      })
    },
    // 班级描述弹窗
    show:function(){
      var that = this
      var arr = that.data.calssMeg.map(item=>{
        // console.log(item.class_desc)
        that.setData({
          classTitle:item.class_desc
        })
      })
      that.setData({
        flag_n:false,
      })
      
    },
    // 班级描述保存提交
    hide_n(){
      var that = this
      wx.request({
        url: API + 'api/update_desc',
        method:'post',
        header:{
          'content-type':"application/x-www-form-urlencoded"
        },
        data:{
          class_id:that.data.Data2,
          class_desc :that.data.classTitle
        },
        success(res){
          console.log(res)
          var desc_new = that.data.desc_new
          if(res.data.data==1){
            that.getIndex();
          }else{
            wx.showToast({
              title: '修改失败',
              duration:1500
            })
          }
        }
      })
      that.setData({
        flag_n:true
      })

    },
    hide_tit(){
      var that = this
      that.setData({
        flag_n:true
      })
    },
    focus_n(e){
      var that = this
      that.setData({
        classTitle:e.detail.value,
        desc_new:e.detail.value
      })
      console.log(that.data.classTitle)
    },
    // 点编辑
    isClose:function(){
      this.setData({
        Closed:false
      })
    },
  // 编辑帖子
  editSta(){
    var that = this
    that.setData({
      tiezi_c:false
    })
      // var classId = this.data.Data2
      // wx.navigateTo({
      //   url: '/pages/createdCard/index?classId= '+ classId,
      //   // success(res){
      //   //   res.eventChannel.emit('classId', {classId })
      //   // }
      // })
  },
  // 点击编辑按钮
  editclass(){
    wx.navigateTo({
      url: '/pages/editClassForm/index',
    })
  },
  // 同学列表
  classList(e){
    var that = this
    var classId = that.data.classId
    var userId = that.data.userID
    var classId_all = that.data.Data
    console.log(e)
    wx.navigateTo({
      url: '/pages/classList/index',
      success(res){
        res.eventChannel.emit('data', {userId,classId,classId_all })
      }
    })
  },
  hide:function(){
    this.setData({
      flag:true
    })
  },
  // 解散班级
  jiesanClass(){
    var that = this
    wx.showToast({
      title: '解散班级暂未开启',
      duration:1500
    })
  },
    // 修改内容
    upload_c(e){
      var that = this
      that.setData({
        content:e.detail.value
      })
      if(e.detail.value.length == 0){
        // 灰色
        that.setData({
          btn_color:true
        })
      }else{
        // 蓝色
        that.setData({
          btn_color:false
        })
      }
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
          if(res.tempFilePaths.length < 9){
            that.setData({
              addimg:false,
              Srcs:tempFilePaths
            })
          }else{
            that.setData({
              Srcs:tempFilePaths,
              addimg:true
            })
          }
        }
      })
    },
    // 添加图片
    img_up_add(){
      var that = this
      var Srcs = that.data.Srcs
      var len = that.data.Srcs.length
      wx.chooseImage({
        count: 9 - len,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          const temp = res.tempFilePaths
          console.log(res.tempFilePaths.length)
          for(var i = 0; i<temp.length;i++){
            Srcs.push(temp[i])
          }
          console.log(temp.length + Srcs.length)
          if(Srcs.length < 9){
            that.setData({
              addimg:false,
              Srcs:Srcs
            })
          }else{
            that.setData({
              Srcs:Srcs,
              addimg:true
            })
          }
        }
      })
    },
    // 移除图片
    hideImg(e){
      var that = this
      var src = that.data.Srcs
      var index = e.currentTarget.dataset.index;
      console.log(index)
      src.splice(index,1)
      that.setData({
        Srcs: src
       });
    },
    //创建帖子
    uploadFile(){
      var that = this
      var Srcs = that.data.Srcs
      if( that.data.content.length < 10){
        that.setData({
           NullID:false
        })
        return false
      }
      if(that.data.Srcs.length == 0){
        wx.request({
          url: API + 'api/addpost',
          data:{
            post_userid: that.data.userID,
            post_classid:that.data.Data2,
            post_content: that.data.content
          },
          success(res){
            console.log(res)
            if(res.data.code == 200){
              var num = that.data.codeC
              that.setData({
                tiezi_c:true
              })
              // 查询帖子
              wx.request({
                url: API + 'api/getallpost',
                data:{
                  post_classid: that.data.Data2
                },
                success(res){
                  console.log(res)
                  if(res.data.data.length != 0){
                    that.setData({
                      calssStateContent:res.data.data,
                      nocon:true,
                    })
                  var arrNew =  that.data.calssStateContent.map(item=>{
                      // 转换时间格式
                      item.post_createtime = timeHandle(item.post_createtime)
                      // console.log(that.data.calssStateContent)
                      that.setData({
                        calssStateContent:that.data.calssStateContent
                      })
                      
                      
                    })

                  }
                }
              })
            }
            // if(that.data.is_ok == su){
            //   var num = that.data.codeC
            //   wx.redirectTo({
            //     url: '/pages/joinClassDetail/index?codeC='+ num,
            //   })
            // }else{
            //   wx.showToast({
            //     title: '发布失败',
            //     duration:1000
            //   })
            // }
          }
        })
      }else{
        wx.request({
          url: API + 'api/addpost',
          data:{
            post_userid: that.data.userID,
            post_classid:that.data.Data2,
            post_content: that.data.content
          },
          success(res){
            console.log(res)
            if(res.data.code == 200){
              if(that.data.Srcs.length == 0){
                return false;
              }else{
                that.uploadimg({
                  url:API+ 'api/addpostimg',
                  path:Srcs,
                  formData:{
                    'post_id': res.data.data,
                  }
                })
              }
            }
  
          }
        })
        if(that.data.is_ok == that.data.success){
          that.setData({
            tiezi_c:true
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
                  // 查询帖子
                  wx.request({
                    url: API + 'api/getallpost',
                    data:{
                      post_classid: that.data.classId
                    },
                    success(res){
                      console.log(res)
                      if(res.data.data.length != 0){
                        that.setData({
                          calssStateContent:res.data.data,
                          nocon:true,
                        })
                        var arrNew =  that.data.calssStateContent.map(item=>{
                                // 转换时间格式
                                item.post_createtime = timeHandle(item.post_createtime)
                                // console.log(that.data.calssStateContent)
                                that.setData({
                                  calssStateContent:that.data.calssStateContent
                                })
                                
                                
                        })
        
                      }
                    }
                  })
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
        upID:false,
       
      })
    },
    // 点错了
    stop(){
      var that = this
      that.setData({
        upID:true,
        tiezi_c:false
      })
    },
    // 确认退出
    submitID(){
      var that = this
      that.setData({
        upID:true,
        tiezi_c:true
      })
      // wx.navigateBack({
      //   delta:1
      // })
    },
    // 知道了
    konwNull(){
      this.setData({
        NullID:true,
        tiezi_c:false
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
        content: this.data.content + e.currentTarget.dataset.emoji
      })
    },
    onPageScroll: function (t) {
      var that = this
      console.log(t.scrollTop)
      that.setData({
        topNav:t.scrollTop
      })
    },
   /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options){
    console.log(options)
    var that = this 
    var data = getApp().globalData.data
    if(options.num_J != 12 ){
      that.setData({
        Data:'', 
        Data2:options.classid 
      })
      that.getIndex()
    }else{
      that.setData({
        Data:options.classmate_classid,
        Data2:options.classmate_classid,
      })
      console.log('111111111111111111')
          // 已加入班级详情
      wx.request({
        url: API + 'api/query_banhui_class',
        data:{
          class_id:options.classmate_classid
        },
        success(res){
          console.log(res)
          if(res.data.code==200){
          that.setData({
            JoincalssMeg:res.data.data,
          })
          // 判断是否为班长
          wx.request({
            url: API +'api/sel_if_monitor',
            data:{
              classmate_classid:options.classmate_classid,
              classmate_userid:that.data.userID
            },
            success(res){
              console.log(res)
              if(res.data.data == ''){
                // 不是班长
                that.setData({
                  num_b:16
                })
              }else{
                // 是班长
                that.setData({
                  num_b:61
                })
              }
            }
          })
            // 查询同学列表
            wx.request({
                url:API + 'api/classmate',
                data:{
                  class_id :options.classmate_classid
                },
                success(res){
                  console.log(res)
                  res.data.data.map(item=>{
                    if(item.classmate_role==2){
                      that.setData({
                        classLsitImg:item.bhuser,
                      })
                      // console.log(item.bhuser)
                    }
                    that.setData({
                      classmate_classid:item.class_id
                    })
                  })
                  // if(res.data.data.length !=0){
                  
                  // }
                }
            })
            // 查询帖子
            wx.request({
              url: API + 'api/getallpost',
              data:{
                post_classid: options.classmate_classid
              },
              success(res){
                console.log('查询帖子')
                console.log(res)
                if(res.data.data.length != 0){
                  that.setData({
                    calssStateContent:res.data.data,
                    nocon:true,
                  })
                var arrNew =  that.data.calssStateContent.map(item=>{
                    // 转换时间格式
                    item.post_createtime = timeHandle(item.post_createtime)
                    // console.log(that.data.calssStateContent)
                    that.setData({
                      calssStateContent:that.data.calssStateContent
                    })
                  })

                }
              }
            })
            // 查询前5位头像
            wx.request({
              url: API + 'api/query_user_limit5',
              data:{
                classmate_classid: options.classmate_classid
              },
              success(res){
                console.log(res.data.data+"======================")
                that.setData({
                  headImg:res.data.data
                })
            }})
          }
        }
      })
      if(options.num_J == 12){
        that.setData({
          num_J:12
        })
      }
    }

    // 创建帖子传递
      if(options.codeC == 1){
        that.setData({
          fabu:false
        })
        setTimeout(function(){
          that.setData({
            fabu:true
          })
        },1500)
      }else{
        that.setData({
          fabu:true
        })
      }
      // 创建班级传递
    if(options.codeA == 0){
      that.setData({
        flag_cre_n:false
      })
      setTimeout(function(){
        that.setData({
          flag_cre_n:true
        })
      },1500)
    }else{
      that.setData({
        flag_cre_n:true
      })
    }
    // 编辑帖子
    if(options.created1 == 1){
      that.setData({
        flag_cre_n:true,
        fabu:true
      })
      setTimeout(function(){
        that.setData({
          flag_cre_n:true
        })
      },1500)
    }else{
      that.setData({
        flag_cre_n:true
      })
    }
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
  // 监听页面显示
  onShow:function(options){
    // console.log(options)
    var that = this
    var data = getApp().globalData.data
    console.log(data)
    that.setData({
      userID:data.user_id
    })
    // that.getIndex();
    // that.getIndex2()

  },
    getIndex(){
      var that = this
      var app = getApp()
      var data = getApp().globalData.data
      console.log(data)
      that.setData({
        userID:data.user_id
      })
      // 创建班级
      wx.request({
        url: API + 'api/query_establish',
        data:{
          user_id:that.data.userID
        },
        success(res){
          console.log(res)
          that.setData({
            calssMeg : res.data.data,
          })
          app.globalData.classMeg = res.data.data
          var arr = that.data.calssMeg.map(item=>{
            // console.log(item.class_id)
            that.setData({
              classId:item.class_id
            })
            // 查询帖子
            wx.request({
              url: API + 'api/getallpost',
              data:{
                post_classid: that.data.classId
              },
              success(res){
                console.log(res)
                if(res.data.data.length != 0){
                  that.setData({
                    calssStateContent:res.data.data,
                    nocon:true,
                  })
                var arrNew =  that.data.calssStateContent.map(item=>{
                    // 转换时间格式
                    item.post_createtime = timeHandle(item.post_createtime)
                    // console.log(that.data.calssStateContent)
                    that.setData({
                      calssStateContent:that.data.calssStateContent
                    })
                    
                    
                  })

                }
              }
            })
            // 查询同学列表
            wx.request({
              url:API + 'api/classmate',
              data:{
                class_id :that.data.classId
              },
              success(res){
                console.log(res)
                res.data.data.map(item=>{
                  if(item.classmate_role==2){
                    that.setData({
                      classLsitImg:item.bhuser,
                    })
                    // console.log(item.bhuser)
                  }
                  that.setData({
                    classmate_classid:item.classmate_classid
                  })
                })
              }
            })
            // 查询前5位头像
            wx.request({
              url: API + 'api/query_user_limit5',
              data:{
                classmate_classid: that.data.classId
              },
              success(res){
                console.log(res.data.data+"======================")
                that.setData({
                  headImg:res.data.data
                })
            }})
          })
        }
      })
    },




})