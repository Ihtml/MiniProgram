// pages/news/news.js
var postsData = require('../../data/posts-data.js')
Page({

  /**
   * 小程序总是会读取data对象来做数据绑定，这个动作称为动作A
   * 而这个动作A的执行，是在onLoad函数执行之后发生的
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // this.data.postList = postsData.postList
    this.setData({
      postList: postsData.postList
    })
  },

  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid
    wx.navigateTo({
      url: 'news-detail/news-detail?id=' + postId
    })
  },
  
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "news-detail/news-detail?id=" + postId
    })
  }
})