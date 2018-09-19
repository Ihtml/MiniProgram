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
    console.log(postId)
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
      console.log('isplay')
      if (app.globalData.g_currentMusicPostId === that.data.currentPostId){
        that.setData({
          isPlayingMusic: true
        })
      }
      app.globalData.g_isPlayingMusic = true
    } else {
      console.log('isclose')
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false
      // app.globalData.g_currentMusicPostId = null
    }
  }

})
