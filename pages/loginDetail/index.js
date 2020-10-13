import API from '../../utils/api'
import {timeHandle} from '../../utils/date'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    flag_c:true,
    flag_n:true,
    contentIpt:true,
    src:API,
    seleted:'1',
    UserID:'',
    post_userid:'',
    // 帖子id
    postId:null,
    // 详情列表数据
    content:'',
    nickename:'',
    userImg:'',
    ImgList:[],
    time:'',
    isImg:null,
    // 回复评论
    commentAll:[],
    comment_sourceid:'',
    lengthAll:'',
    onlylength:'',
    num_login:'',
    calssImg:'',
    calssName:'',
    classTitle:'',
    comment_isOp:'',
    ipntCont:''

  },
   // 评论内容
   ipntContBtn(e){
    console.log(e)
    var that = this
    var contentNew = e.detail.value
    that.setData({
      ipntCont:contentNew
    })
  },
  // 提交评论 --判断
  uploadIpt(){
    var that = this
    wx.request({
      url: API +'api/query_user_class',
      data:{
        PostUserid:that.data.post_userid,
        User:that.data.UserID
      },
      success(res){
        console.log('=========================')
        console.log(res)
        if(res.data.data == ''){
          // 发布评论
          that.setData({
            flag_c: false,
            contentIpt: true,
          })
        }else{
          that.setData({
            contentIpt: false,
            flag_c: true,
            is_focus: true
          })
        }
      }
    })
  },
  // 关闭发布
tijaofabu(){
  var that = this
  that.setData({
    contentIpt:true
  })
},
    //申请加入班级
    JoinClass(){
      var that = this
      wx.switchTab({
        url: '/pages/classAll/index',
      })
    },
  // 提交评论
  fabupinglun(){
    var that = this
    wx.request({
      url: API +'api/Query_comment',
      data:{
        comment_userid:that.data.UserID,
        comment_sourceid:that.data.comment_sourceid,
        comment_isOp:that.data.comment_isOp,
        comment_content:that.data.ipntCont
      },
      success(res){
       console.log(res)
       if(res.data.data == 1){
         that.setData({
          contentIpt:true
         })
       }
      // 全部评论
      wx.request({
        url: API + 'api/selcommentpost',
        data:{
          comment_sourceid:that.data.comment_sourceid
        },
        success(res){
          console.log(res)
          that.setData({
            commentAll:res.data.data,
            lengthAll: res.data.data.length
          })
          if(res.data.data.length ==0){
            that.setData({
              isComment:true,
              Nocon:false
            })
          }else{
            that.setData({
              isComment:false,
              Nocon:true
            })
          }
          res.data.data.map(item=>{
            item.comment_createtime = timeHandle(item.comment_createtime)
            that.setData({
              commentAll:that.data.commentAll,
              comment_isOp:item.comment_isOp
            })
          })
        }
      })
      }
    })
  },
  // 只看楼主
  seletednow(e){
    var that= this;
    if(that.data.seleted===e.target.dataset.num){
      return false;
    }else{
      that.setData({
        seleted: e.target.dataset.num
      })
    }
    // 全部评论
    if(e.target.dataset.num ==1){
      
      wx.request({
        url: API + 'api/selcommentpost',
        data:{
          comment_sourceid:that.data.comment_sourceid
        },
        success(res){
          console.log(res)
          that.setData({
            commentAll:res.data.data,
            lengthAll: res.data.data.length
          })
          res.data.data.map(item=>{
            item.comment_createtime = timeHandle(item.comment_createtime)
            that.setData({
              commentAll:that.data.commentAll,
            })
          })
        }
      })
    }
    // 只看楼主
    if( e.target.dataset.num ==2){
      wx.request({
        url: API + 'api/selcommentpostlouzhu',
        data:{
          comment_sourceid:that.data.comment_sourceid
        },
        success(res){
          console.log(res)
          if(res.data.code==200){
            that.setData({
              commentAll:res.data.data,
              onlylength:res.data.data.length,
              post_userid:res.data.data.post_userid
            })
            res.data.data.map(item=>{
              item.comment_createtime = timeHandle(item.comment_createtime)
              that.setData({
                commentAll:that.data.commentAll,
              })
            })
          }
        }
      })
    }

  },
  // 修改帖子
  editCards(){
    var that = this
    wx.navigateTo({
      url: '/pages/editCard/index',
      success(res){
        res.eventChannel.emit('postId',that.data.postId)
      }
    })
  },
  // 删除帖子
  delCard(){
    var that = this
    wx.request({
      url: API +'api/deletpost',
      data:{
        post_id:that.data.postId
      },
      success(res){
        // console.log(res)
        if(res.data.data == 1){
          wx.showToast({
            title: '删除帖子成功',
            duration:1000
          })
          wx.redirectTo({
            // delta:1
            url: '/pages/joinClassDetail/index',
          })
        }
      }
    })
  },

  // 弹出
  show:function(){
    this.setData({
      flag:false
    })
  },
    // 弹出
    show_c:function(){
      this.setData({
        flag_c:false
      })
    },
  // 关闭
  hide:function(){
    this.setData({
      flag:true
    })
  },
   // 关闭
   hide_c:function(){
      this.setData({
        flag_c:true
      })
   },

   onLoad(options){
      var that = this
      var id = options.id
      console.log(options)
      var data = getApp().globalData.data
      console.log(data)
      that.setData({
        UserID:data.user_id
      })
      that.setData({
        comment_sourceid:id,
        num_login:2
      })
      that.setData({
        postId:id,
        num_login:2
      })
      // 请求
      wx.request({
        url: API +'api/postxq',
        data:{
          post_id:that.data.postId
        },
        success(res){
          console.log(res)
          if(res.data.code == 200){
            var Data = res.data.data
            that.setData({
              content:Data.post_content,
              nickename:Data.post_user.user_nickname,
              userImg:Data.post_user.user_avatar,
              ImgList:Data.post_postimg,
              time:timeHandle(Data.post_createtime),
              post_userid:res.data.data.post_userid
            })
            console.log(that.data.ImgList.length)
            that.data.ImgList.map(item=>{
             
              if(item.post_imgurl == null){
                that.setData({
                  isImg:true
                })
              }
              if(item.post_imgurl != null){
                that.setData({
                  isImg:false
                })
              }
            })
            if(res.data.data.post_userid == data.user_id){
              that.setData({
                comment_isOp:1
              })
            }else{
              that.setData({
                comment_isOp:0
              })
            }
          }
        }
      })
      // 全部评论
      wx.request({
        url: API + 'api/selcommentpost',
        data:{
          comment_sourceid:that.data.comment_sourceid
        },
        success(res){
          console.log(res)
          that.setData({
            commentAll:res.data.data,
            lengthAll: res.data.data.length
          })
          
          res.data.data.map(item=>{
            item.comment_createtime = timeHandle(item.comment_createtime)
            that.setData({
              commentAll:that.data.commentAll,
            })
          })
        }
      })
    

   }
})