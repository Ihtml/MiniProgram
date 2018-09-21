// pages/movies/movie-detail/movie-detail.js
import { Movie } from 'class/Movie.js'
const app = getApp()
Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    const movieId = options.id
    const url = app.globalData.doubanBase +
      "/v2/movie/subject/" + movieId
    const movieObj = new Movie(url)
    movieObj.getMovieData((data) => {
      this.setData({
        movie: data
      })
    })
  },

  // 预览图片
  viewMoviePostImg: function (e) {
    const src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }
})