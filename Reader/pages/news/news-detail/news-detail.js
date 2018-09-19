// pages/news/news-detail/news-detail.js
var postsData = require('../../../data/posts-data.js')
// 获取全局属性
var app = getApp()
var backgroundAudioManager = wx.getBackgroundAudioManager()
Page({
  data: {
    isPlayingMusic: false,
    currentPostId: '',
    postData: '',
    collected: ''
  },
  onLoad: function (option) {
    
    var postId = option.id
    this.setData({
      currentPostId: postId
    })
    var postData = postsData.postList[postId]
    this.setData({
      postData: postData
    })
    // 判断是否播放音乐
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor()
    // 根据缓存判断是否已收藏
    var postsCollected = wx.getStorageSync('posts_collected')
    if (postsCollected) {
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else {
      // 如果没有缓存，就添加缓存
      var postsCollected = {}
      postsCollected[postId] = false
      wx.setStorageSync('posts_collected', postsCollected)
    }
  },
  // 监听全局的音乐播放暂停
  setMusicMonitor: function () {
    var that = this
    backgroundAudioManager.onPlay(
      function () {
        that.isMusicPlaying(true)
      }
    )
    backgroundAudioManager.onPause(
      function () {
        that.isMusicPlaying(false)
      }
    )
    backgroundAudioManager.onStop(
      function () {
        that.isMusicPlaying(false)
      }
    )
  },
  onMusicTap: function () {
    var song = this.data.postData.music
    if (this.data.isPlayingMusic === true) {
      backgroundAudioManager.pause()
    } else {
      backgroundAudioManager.title = song.title
      backgroundAudioManager.coverImgUrl = song.coverImg
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = song.url;
      app.globalData.g_currentMusicPostId = this.data.currentPostId
      backgroundAudioManager.play()
    }
  },
  isMusicPlaying: function (flag) {
    var that = this
    if (flag) {
      if (app.globalData.g_currentMusicPostId === that.data.currentPostId){
        that.setData({
          isPlayingMusic: true
        })
      }
      app.globalData.g_isPlayingMusic = true
    } else {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      // app.globalData.g_currentMusicPostId = null
    }
  },
  // 点击收藏事件
  onColletionTap () {
    var postsCollected = wx.getStorageSync('posts_collected')
    var postCollected = postsCollected[this.data.currentPostId]
    // 收藏变成未收藏，未收藏变为收藏
    postCollected = !postCollected
    postsCollected[this.data.currentPostId] = postCollected
    wx.setStorageSync('posts_collected', postsCollected)
    this.showToast(postsCollected, postCollected)
  },
  showToast (postsCollected, postCollected) {
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? "收藏成功" : "取消成功",
      duration: 1000,
      icon: "success"
    })
  }
})
