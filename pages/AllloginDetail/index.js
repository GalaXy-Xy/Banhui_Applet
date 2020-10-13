import API from '../../utils/api'
import {
  timeHandle,timeaa
} from '../../utils/date'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLOU:'',
    huifu: [],
    huifu2:[],
    idd:'',
    flag: true,
    flag_c: true,
    kaichu: true,
    guangg: true,
    guanliyuan: true,
    delTiezi:null,
    src: API,
    seleted: '1',
    // 帖子id
    postId: null,
    userID: '',
    UserID: '',
    post_userid: '',
    calssId: '',
    // 详情列表数据
    content: '',
    nickename: '',
    userImg: '',
    ImgList: [],
    time: '',
    isImg: null,
    // 回复评论
    commentAll: [],
    comment_id:'',
    comment_sourceid: '',
    lengthAll: '',
    onlylength: '',
    num_login: '',
    calssImg: '',
    calssName: '',
    // 评论内容
    pl:true,
    ipntCont: '',
    contentIpt: true,
    contentIpt2:true,
    Nocon: true,
    isComment: true,
    comment_isOp: '',
    is_focus: false,
    flag_del:true,
    dataCommentid:'',
    dataUuserid:'',
    commentId:'',
    bottom:'',
    nr:'',
    aa:0,
    dd:'',
    
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

    num_ff:[],

    toView:''
  },
  hide_pl(){
    this.setData({
      pl:true
    })
  },
  // 瞄点定位
  dingwei(e){
    console.log(e)
    var target = e.currentTarget.id
    this.setData({
      toView:target
    })
  },
  // 键盘事件
  blur(e){
    var that = this;
    that.setData({
      bottom: 0
    })
  },
  foucus(e){
    console.log(e)
    var that = this;
    that.setData({
      bottom: e.detail.height
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
  idd(e){
    var that=this;
      console.log(e)
    that.setData({
      idd:e.currentTarget.id
    })  
  },
  // 只看楼主
  seletednow(e) {
    var that = this;
    if (that.data.seleted === e.target.dataset.num) {
      return false;
    } else {
      that.setData({
        seleted: e.target.dataset.num
      })
    }
    // 全部评论
    if (e.target.dataset.num == 1) {
      wx.request({
        url: API + 'api/selcommentpost',
        data: {
          post_id: that.data.comment_sourceid
        },
        success(res) {
          console.log(res)
          that.setData({
            commentAll: res.data.data,
            lengthAll: res.data.data.length
          })
          if (res.data.data.length == 0) {
            that.setData({
              isComment: true,
              Nocon: false
            })
          } else {
            that.setData({
              isComment: false,
              Nocon: true
            })
          }
          res.data.data.map(item => {
            item.comment_createtime = timeHandle(item.comment_createtime)
            that.setData({
              commentAll: that.data.commentAll,
            })
          })
          var nun = []
          res.data.data.map(item=>{
            if(item.comment_type == 1){
              console.log(item)
              that.data.num_ff = nun
              that.data.num_ff.push(item.comment_sourceid)
              that.setData({
                num_ff:that.data.num_ff
              })          
            }   
            if(item.comment_content == '此内容已经不存在!' && res.data.data.length == 1 ) {
              that.setData({
                isComment:true,
                Nocon:false,
                lengthAll:0,
                onlylength:0
              })
            } 
          })
          // console.log(that.data.num_ff)
          that.data.num_ff.map(item=>{
            console.log(item)
            res.data.data.map(item2=>{
              
              if(item == item2.comment_id) {
                console.log(item2)
                that.data.huifu.push(item2)
                that.setData({
                  huifu:that.data.huifu
                })
              }
            })
          })
          // console.log(that.data.huifu)
          if(that.data.huifu.length>2){
            for(var i = 0;i<that.data.huifu.length;i++){
                for( var  j = 0;j<that.data.huifu.length;j++){
                  // console.log(that.data.huifu[i].comment_id)
                  if(that.data.huifu[i].comment_id == that.data.huifu[j].comment_id){
                    that.data.huifu.splice(j,1)
                    that.setData({
                      huifu:that.data.huifu
                    })
                  }
                }
            }
          }
          // console.log(that.data.huifu)
         
        }
      })
     
    }
    // 只看楼主
    if (e.target.dataset.num == 2) {
      wx.request({
        url: API + 'api/selcommentpostlouzhu',
        data: {
          post_id: that.data.comment_sourceid
        },
        success(res) {
          console.log(res)
          if (res.data.code == 200) {
            that.setData({
              commentAll: res.data.data,
              onlylength: res.data.data.length
            })
            res.data.data.map(item => {
              item.comment_createtime = timeHandle(item.comment_createtime)
              that.setData({
                commentAll: that.data.commentAll,
              })
            })

            res.data.data.map(item=>{
              if(item.comment_type == 1){
                console.log(item)
                that.data.num_ff.push(item.comment_sourceid)
                that.setData({
                  num_ff:that.data.num_ff
                })          
              }     
            })
            // console.log(that.data.num_ff)
            that.data.num_ff.map(item=>{
              // console.log(item)
              res.data.data.map(item2=>{
                
                if(item == item2.comment_id) {
                  // console.log(item2)
                  that.data.huifu.push(item2)
                  that.setData({
                    huifu:that.data.huifu
                  })
                }
              })
              
            })
            
            if(that.data.huifu.length >2){
              for(var i = 0;i<that.data.huifu.length;i++){
                  for( var  j = 0;j<that.data.huifu.length;j++){
                    if(that.data.huifu[i].comment_id == that.data.huifu[j].comment_id){
                      that.data.huifu.splice(j,1)
                      that.setData({
                        huifu:that.data.huifu
                      })
                    }
                  }
              }
            }
          }
        }
      })
    }

  },
  // 修改帖子
  editCards() {
    var that = this
    wx.navigateTo({
      url: '/pages/editCard/index',
      success(res) {
        res.eventChannel.emit('postId', that.data.postId)
      }
    })
  },
  // 删除帖子
  delCard_c() {
    var that = this
    console.log('删除帖子')
    wx.request({
      url: API +'api/deletpost',
      data:{
        post_id:that.data.comment_sourceid,
        PostUserid:that.data.post_userid,
        User:that.data.UserID,
        post_classid:that.data.calssId,
      },
      success(res){
        console.log(res)
        if(res.data.data == 1){
          wx.switchTab({
            url:'/pages/login/index'
          })
        }else{
          wx.showToast({
            title: '无法删除',
            duration:1500
          })
        }
      }
    })
  },
  //广告骚扰
  guanggao(){
    var that=this;
    console.log(that.data.postId)
    wx.request({
      url: API + 'api/insert_inform',
      data:{
        inform_userid:that.data.userID,
        inform_hint:5,
        inform_xq:"广告骚扰",
        inform_hintuser:that.data.UserID,
        inform_postid:that.data.comment_sourceid,
        inform_commentid:0,
        inform_classid:0,
        inform_read:1
      },
      success:function(res){  
        console.log(res.data.data)
        if(res.data.data==1){
          that.setData({
            guangg:true
          })
          wx.showToast({
            title: '举报成功',
            icon: 'success',     //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
            duration: 2000,      //停留时间
          })
        }
      }
    })
  },
  //内容低俗
  neirong(){
    var that=this;
    wx.request({
      url: API + 'api/insert_inform',
      data:{
        inform_userid:that.data.userID,
        inform_hint:6,
        inform_xq:"内容低俗",
        inform_hintuser:that.data.UserID,
        inform_postid:that.data.comment_sourceid,
        inform_commentid:0,
        inform_classid:0,
        inform_read:1
      },
      success:function(res){  
        console.log(res.data.data)
        if(res.data.data==1){
          that.setData({
            guangg:true
          })
          wx.showToast({
            title: '举报成功',
            icon: 'success',     //默认值是success,就算没有icon这个值，就算有其他值最终也显示success
            duration: 2000,      //停留时间
          })
        }
      }
    })
  },
  // 开除同学
  remove_c() {
    var that = this
    wx.request({
      url: API + 'api/delclassmate',
      data: {
        classmate_userid: that.data.userID,
        classmate_classid: that.data.calssId,
        User: that.data.UserID
      },
      success(res) {
        console.log(res)
        if (res.data.data == 1) {
          wx.switchTab({
            url: '/pages/login/index',
          })
        }else{
          wx.showToast({
            title: '无法开除',
            duration: 1500
          })
        }
      }
    })
  },
  // 封号
  fenghao() {
    var that = this
    wx.request({
      url: API + 'api/update_state_user',
      data: {
        user_id: that.data.userID
      },
      success(res) {
        console.log(res)
        if (res.data.data == 1) {
          wx.switchTab({
            url: '/pages/login/index',
          })
        }
      }
    })
  },
  // 评论内容
  ipntContBtn(e) {
    console.log(e)
    var that = this
    var contentNew = e.detail.value
    console.log(contentNew.length)
    that.setData({
      ipntCont: contentNew
    })
    if(e.detail.value == ''){
      wx.showToast({
        title: '请输入内容',
        duration:1500
      })
    }
    if(e.detail.value.length > 126){
      wx.showToast({
        title: '内容过长',
        duration:1500
      })
    }
  },
  // 提交评论 --判断
  uploadIpt() {
    var that = this
    wx.request({
      url: API + 'api/query_user_class',
      data: {
        classmate_classid: that.data.calssId,
        User: that.data.UserID
      },
      success(res) {
        console.log('=========================')
        console.log(res)
        if (res.data.data == null) {
          
          that.setData({
            flag_c: false,
            contentIpt: true,
            ipntCont:''
          })
        } else {
          // 发布评论
          that.setData({
            contentIpt: false,
            flag_c: true,
            is_focus: false,
          })
        }
      }
    })

  },
  //回复
  uploadIpt2(e) {
    console.log(e)
    var that = this
    if(that.data.ipntCont != ''){
      that.setData({
        ipntCont:''
      })
    }
    that.setData({
      comment_id:e.currentTarget.id,
      commentId:e.currentTarget.dataset.commentid
    })
    wx.request({
      url: API + 'api/query_user_class',
      data: {
        classmate_classid: that.data.calssId,
        User: that.data.UserID
      },
      success(res) {
        console.log('11111111111=========================')
        console.log(res)
        if (res.data.data != null) {
          // 发布评论
          that.setData({
            contentIpt:true,
            contentIpt2: false,
            is_focus: false
          })
        } else {
          that.setData({
            flag_c: false,
            contentIpt2: true,
            contentIpt:true,
          })
          wx.showToast({
            title: '无法回复',
            duration:1500
          })
        }
      }
    })
  },
  fabupinglun2(){
    var that = this
    // console.log(that.data.comment_sourceid)
    console.log(that.data.comment_id)
    console.log(that.data.UserID)
    if(that.data.comment_id == that.data.UserID){
      console.log('huifu11111111111111111111111111111')
      wx.request({
        url: API + '/api/Query_comment',
        data: {
          comment_userid: that.data.UserID,
          comment_sourceid:that.data.commentId,
          comment_isOp:that.data.comment_isOp,                                                                                      
          comment_content:that.data.ipntCont,
          comment_type:1,
          post_id:that.data.comment_sourceid,
          comment_id: that.data.commentId,
          inform_postid :that.data.comment_sourceid,
          inform_classid :that.data.calssId
          // post_userid:that.data.userID                                                                  
        },
        success(res) {
          console.log('=========================')
          console.log(res)
          if (res.data.data != '') {
            // 发布评论
            that.setData({
              contentIpt:true,
              contentIpt2: true,
              // is_focus: true
            })
          } else {
            wx.showToast({
              title: '请输入评论内容',
              duration:1500
            })
            that.setData({
              flag_c: false,
              contentIpt2: false,
              contentIpt:true,
            })
          }
          that.getIndex2()
        }
      })
    }else{
      console.log('huifu2222222222222222222222222222222222')
      wx.request({
        url: API + '/api/Query_comment',
        data: {
          comment_userid: that.data.UserID,
          comment_sourceid:that.data.commentId,
          comment_isOp:that.data.comment_isOp,                                                                                      
          comment_content:that.data.ipntCont,
          comment_type:1,
          post_userid:that.data.comment_id,
          post_id:that.data.comment_sourceid,
          comment_id: that.data.commentId,
          inform_postid :that.data.comment_sourceid,
          inform_classid :that.data.calssId,
          inform_xq:'回复你的评论'                                                                
        },
        success(res) {
          console.log('=========================')
          console.log(res)
          if (res.data.data != '') {
            // 发布评论
            that.setData({
              contentIpt2: true,
              // is_focus: true,
              ipntCont: ''
            })
          } else {
            wx.showToast({
              title: '请输入评论内容',
              duration:1500
            })
            that.setData({
              flag_c: false,
              contentIpt2: false,
            })
          }
          that.getIndex2()
        }
      })
    }
  },
  // 提交评论
  fabupinglun() {
    var that = this
    // while(that.data.ipntCont.indexOf("")<=0){
    //   wx.showToast({
    //     title: '请输入评论内容',
    //     duration:1500
    //   })
    //   return false
    // }
    if(that.data.ipntCont==''){
      wx.showToast({
        title: '请输入评论内容',
        duration:1500
      })
      return false
    }else if(that.data.ipntCont.length >126){
      wx.showToast({
        title: '内容过长',
        duration:1500
      })
      return false
    }
    else{
      if(that.data.dataUuserid != ''){
        // 编辑评论
        wx.request({
          url: API +'api/updatecommentContent',
          data:{
            comment_id:that.data.dataCommentid,
            comment_content:that.data.ipntCont
          },
          success(res){
            console.log('编辑评论')
            console.log(res)
            if(res.data.data ==1){
              that.setData({
                contentIpt:true
              })
            }else{
              that.setData({
                contentIpt:true
              })
              wx.showToast({
                title: '修改评论失败',
                duration:1500
              })
            }
             // 全部评论
            that.getIndex2()
          }
        })
      }else{
        // 发布评论
        console.log('发布评论')
        wx.request({
          url: API + 'api/Query_comment',
          data: {
            comment_userid: that.data.UserID,
            comment_sourceid: that.data.comment_sourceid,
            comment_isOp: that.data.comment_isOp,
            comment_content: that.data.ipntCont,
            post_userid :that.data.userID,
            post_id:that.data.comment_sourceid,
            // comment_id: that.data.commentId,
            inform_xq:'评论你的帖子',
            inform_postid :that.data.comment_sourceid,
            inform_classid :that.data.calssId
          },
          success(res) {
            console.log(res)
            if (res.data.data == 1) {
              that.setData({
                contentIpt: true,
                ipntCont: ''
              })
            }
            // 全部评论
            that.getIndex2()
          }
        })
      }
    }
  },
  //申请加入班级
  JoinClass() {
    var that = this
    wx.switchTab({
      url: '/pages/classAll/index',
    })
  },
  // 弹出 -- 判断用户
  show: function () {
    var that = this
    this.setData({
      flag: false
    })
    wx.request({
      url: API + 'api/judge_User_role',
      data: {
        PostUserid: that.data.post_userid,
        User: that.data.UserID,
        class_id:that.data.calssId
      },
      success(res) {
        console.log('=========================')
        console.log(res)
        if(res.data.data == 5){
          that.setData({
            guangg: true,
            flag: true,
            kaichu: false,
            guanliyuan: true
          })
        }else
        if (res.data.data == 4) {
          that.setData({
            guangg: false,
            flag: true,
            kaichu: true,
            guanliyuan: true
          })
        } else if (res.data.data == 3) {
          that.setData({
            // guangg: true,
            // flag: true,
            // kaichu: false,
            // guanliyuan: true
            guangg: false,
            flag: true,
            kaichu: true,
            guanliyuan: true
          })
        } else if (res.data.data == 1) {
          that.setData({
            guangg: true,
            flag: false,
            kaichu: true,
            guanliyuan: true
          })
        } else {
          that.setData({
            guangg: true,
            flag: true,
            kaichu: true,
            guanliyuan: false
          })
        }
      }
    })
  },
  // 关闭发布
  tijaofabu() {
    var that = this
    that.setData({
      contentIpt: true
    })
  },
  // 关闭发布
  tijaofabu2() {
    var that = this
    that.setData({
      contentIpt2: true
    })
  },
  // 弹出 -评论
  show_c: function (e) {
    console.log(e)
    var that = this
    that.setData({    
      dataCommentid:e.target.dataset.commentid,
      dataUuserid:e.target.dataset.userid
    })
    wx.request({
      url: API +'/api/if_commentController',
      data:{
        postuserid:that.data.userID, //帖子的用户ID
        User:that.data.UserID, //登录者ID
        commentuserid:e.target.dataset.userid//评论的用户ID
      },
      success(res){
        console.log('是否显示')
        console.log(res)
        that.setData({
          isLOU:res.data.data
        })
        if(res.data.data == 0 || res.data.data == null){
          that.setData({
            pl:true
          })
        }else{
          that.setData({
            pl:false
          })
        }
      }
    })
  },
  // 编辑 --  评论
  editCards_pl(){
    var that = this
    wx.request({
      url: API + 'api/judge_User_role',
      data: {
        PostUserid: that.data.dataUuserid,
        User: that.data.UserID,
        class_id:that.data.calssId
      },
      success(res) {
        console.log('评论=========================')
        console.log(res)
        if (res.data.data == 1) {
          that.setData({
            contentIpt:false,
            pl:true
          })
        }  else {
         wx.showToast({
           title: '无法修改该评论',
            duration:1500
         })
         that.setData({
          pl:true
         })
        }
      }
    })
  },
  // 删除 --  评论
  delCard_pl(){
    var that = this
    wx.request({
      url: API + 'api/judge_User_role',
      data: {
        PostUserid: that.data.dataUuserid,
        User: that.data.UserID,
        class_id:that.data.calssId
      },
      success(res) {
        console.log('=========================')
        console.log(res)
        that.setData({
          flag_del:false,
          pl:true
        })
        // if (res.data.data == 1 || res.data.data == 2 || res.data.data == 3) {
        //   that.setData({
        //     flag_del:false,
        //     pl:true
        //   })
        // }  else {
        //   that.setData({
        //     pl:true,
        //   })
        //   wx.showToast({
        //     title: '您无法删除该评论',
        //     duration:1500
        //   })
        // }
      }
    })
  },
    hide_del(){
    var that = this
    that.setData({
      flag_del:true
    })
    },
  // 删除评论
  yes_del(e){
    console.log(e)
    var that = this
    //  that.data.comment_sourceid that.data.UserID
    wx.request({
      url: API +'api/del_comment',
      data:{
        User:that.data.UserID,
        post_id:that.data.comment_sourceid,
        comment_id:that.data.dataCommentid,
        comment_userid:that.data.dataUuserid,
        post_userid:that.data.post_userid
      },
      success(res){
        console.log(res)
        if(res.data.data ==101){
          // 删除失败
          that.setData({
            flag_del:true,
            nr:33
          })
          wx.showToast({
            title: '无法删除该评论',
            duration:1500
          })
          // 全部评论
          that.getIndex2()
        }else{
          // 删除成功
          that.setData({
            flag_del:true,
            nr:33
          }) 
          wx.showToast({
            title: '删除成功',
            duration:1500
          })
           // 全部评论
          that.getIndex2()
        }
      }
    })
  },
  // 关闭
  hide: function () {
    this.setData({
      flag: true,
      guangg: true,
      kaichu: true,
      guanliyuan: true,
      pl:true,
      delTiezi:13
    })
  },
  // 关闭
  hide_c: function () {
    var that = this
    that.setData({
      flag_c: true
    })
  },

  onLoad(options) {
    var that = this
    var id = options.id
    var data = getApp().globalData.data
    console.log(data)
    that.setData({
      UserID: data.user_id
    })
    console.log(options)
    if (options.postId != '') {
      that.setData({
        calssId: options.calssid,
        comment_sourceid: options.postId,
        num_login: 1,
        calssName: options.className,
        calssImg: options.calssImg
      })
      that.setData({
        postId: options.postId,
        num_login: 1
      })
    } else {
      that.setData({
        comment_sourceid: id,
        num_login: 2
      })
      that.setData({
        postId: id,
        num_login: 2
      })
    }
    // 请求
    wx.request({
      url: API + 'api/postxq',
      data: {
        post_id: that.data.postId
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          var Data = res.data.data
          that.setData({
            content: Data.post_content,
            nickename: Data.post_user.user_nickname,
            userImg: Data.post_user.user_avatar,
            ImgList: Data.post_postimg,
            time: timeHandle(Data.post_createtime),
            post_userid: res.data.data.post_userid,
            userID: res.data.data.post_user.user_id
          })
          console.log(that.data.ImgList.length)
          that.data.ImgList.map(item => {

            if (item.post_imgurl == null) {
              that.setData({
                isImg: true
              })
            }
            if (item.post_imgurl != null) {
              that.setData({
                isImg: false
              })
            }
          })
          if (res.data.data.post_userid == data.user_id) {
            that.setData({
              comment_isOp: 1
            })
          } else {
            that.setData({
              comment_isOp: 0
            })
          }
        }
      }
    })
    // 全部评论
    that.getIndex2()
    // that.getIndex()

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
  onShow(){
    var that = this
    that.setData({
      delTiezi:13
    }) 
    // 全部评论
    that.getIndex2()
  },
    // 全部评论
    getIndex2(){
      var that = this
      wx.request({
        url: API + 'api/selcommentpost',
        data: {
          post_id: that.data.comment_sourceid
        },
        success(res) {
          console.log(res)
          that.setData({
            commentAll: res.data.data,
            lengthAll: res.data.data.length
          })
          if (res.data.data.length == 0) {
            that.setData({
              isComment: true,
              Nocon: false
            })
          } else {
            that.setData({
              isComment: false,
              Nocon: true
            })
          }
          res.data.data.map(item => {
            item.comment_createtime = timeHandle(item.comment_createtime)
            that.setData({
              commentAll: that.data.commentAll,
            })
          })
          
          res.data.data.map(item=>{
            if(item.comment_type == 1){
              console.log(item)
              that.data.num_ff.push(item.comment_sourceid)
              that.setData({
                num_ff:that.data.num_ff
              })          
            }    
            if(item.comment_content == '此内容已经不存在!' && res.data.data.length == 1 ) {
              that.setData({
                isComment:true,
                Nocon:false,
                lengthAll:0,
                onlylength:0
              })
            }  
          })
          // console.log(that.data.num_ff)
          var num = []
          that.setData({
            huifu:num
          })
          that.data.num_ff.map(item=>{
            console.log(item)
            res.data.data.map(item2=>{
              if(item == item2.comment_id) {
                console.log(item2)
                num.push(item2)
                that.setData({
                  huifu:num,
                  aa:2
                })
              }
            })
            
          })
          console.log(that.data.huifu)
          if(that.data.huifu.length >1){
            for(var i = 0;i<that.data.huifu.length;i++){
                for( var  j = 0;j<that.data.huifu.length;j++){
                  // console.log(that.data.huifu[i].comment_id)
                  if(that.data.huifu[i].comment_id == that.data.huifu[j].comment_id){
                    that.data.huifu.splice(j,1)
                    that.setData({
                      huifu:that.data.huifu
                    })
                  }
                }
            }
          }
          console.log(that.data.huifu)
        }
      })
    },


})