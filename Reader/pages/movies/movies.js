// pages/movies/movies.js
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {},
    searchResult: {},
    containerShow: true,
    searchPanelShow: false,
    readyData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    const inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters" + "?start=0&count=3"
    const comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon" + "?start=0&count=3"
    const top250Url = app.globalData.doubanBase +
      "/v2/movie/top250" + "?start=0&count=3"

    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映")
    this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映")
    this.getMovieListData(top250Url, "top250", "豆瓣Top250")
  },

  getMovieListData: function (url, settedKey, categoryTitle) {
    const that = this
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function (error) {
        // fail
        console.log(error)
      }
    })
  },

  processDoubanData: function (moviesDouban, settedKey, categoryTitle){
    const movies = []
    for (let idx in moviesDouban.subjects) {
      const subject = moviesDouban.subjects[idx]
      let title = subject.title
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      }
      const temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    const readyData = {}
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData);
  }
})