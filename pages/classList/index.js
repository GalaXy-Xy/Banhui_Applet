import API from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 班级id
    classId :null,
    src: API,
    // 副班长
    list:[],
    // 同学
    list_tx:[],
    // 班长
    list1:[],
    dataAll:[],
    mateId:[],
    User:''
  },
  formatCities(data){
    var that = this
    data.map((item)=>{
        // 归类
        // 根据首字母 截取首字母
        // console.log(item)
        var firstLetter= item.classmate_role
        if(firstLetter==1){
          // 副班长
         that.data.list.push(item)  
         that.setData({
          list:that.data.list
         })
        //  console.log('副班长'+that.data.list)
        }else if(firstLetter==2){
          // 班长
          that.data.list1.push(item) 
          
          that.setData({
            list1:that.data.list1
          })
          // console.log('班长'+that.data.list1)
        }else{
        // 同学
          that.data.list_tx.push(item) 
          that.setData({
            list_tx:that.data.list_tx
          })
          // console.log(that.data.list_tx)
        }
       
    })
  },
  // 开除
  delClass(e){
    console.log(e)
    var that= this
    var index = e.currentTarget.dataset.index
    var index1 = e.currentTarget.dataset.index1
    var mate = e.currentTarget.dataset.mate
    console.log(mate)
    that.data.list.splice(index,1)
    that.data.list_tx.splice(index1,1)
    that.setData({
      list:that.data.list,
      list_tx:that.data.list_tx
    })
    wx.request({
      url: API + 'api/delclassmate',
      data:{
        classmate_classid:that.data.classId,
        classmate_userid:mate,
        User:that.data.User
      },
      success(res){
        console.log(res)
      }
    })
  },
  // 百万榜单
  millon(e){
    console.log(e)
    var that = this
    var classId = that.data.classId
    var data = JSON.stringify(e.currentTarget.dataset.user)
    wx.navigateTo({
      url: '/pages/userInfo1-1-1/index?classId=' +classId + '&user=' + JSON.stringify(e.currentTarget.dataset.user),
      success(res){
        res.eventChannel.emit('userInfo', JSON.stringify(e.currentTarget.dataset.user))
      }
    })

  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('data', function(data) {
      console.log(data)
      if(data.classId_all != ''){
        that.setData({
          classId:data.classId_all,
          num_l:12
        })
        wx.request({
          url: API +'api/classmate',
          data:{
            class_id:data.classId_all
          },
          success(res){
            console.log(res)
            if(res.data.code == 200){
              that.formatCities(res.data.data)
              that.setData({
                dataAll:res.data.data
              })
            }
            var arr = res.data.data.map(item=>{
              // console.log(item.classmate_id)
              that.setData({
                zw:item.classmate_role,
              })  
              if(item.classmate_role == 2){
                item.bhuser.map(item=>{
                  console.log(item.user_id+'1111111111')
                  that.setData({
                    User:item.user_id
                  })
                })
               
              } 
            })             
          }
        })
      }else{
        that.setData({
          classId:data.classId,
          num_l:14
        })
        wx.request({
          url: API +'api/classmate',
          data:{
            class_id:data.classId
          },
          success(res){
            console.log(res)
            if(res.data.code == 200){
              that.formatCities(res.data.data)
              that.setData({
                dataAll:res.data.data
              })
            }
            var arr = res.data.data.map(item=>{
              // console.log(item.classmate_id)
              that.setData({
                zw:item.classmate_role
              })
              if(item.classmate_role == 2){
                item.bhuser.map(item=>{
                  console.log(item.user_id+'1111111111')
                  that.setData({
                    User:item.user_id
                  })
                })

              }    
            })             
          }
        })
      }

    })
    // 

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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