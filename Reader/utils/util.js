// 这里存放公用函数
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const convertToStarsArray = (stars) => {
  const num = stars.toString().substring(0, 1)
  const array = []
  for (let i = 1; i <= 5; i++) {
    if (i < num) {
      array.push(1)
    } else {
      array.push(0)
    }
  }
  return array
}

const http = (url, callBack) => {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

const convertToCastString = (casts) => {
  let castsjoin = ""
  for (let idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / "
  }
  return castsjoin.substring(0, castsjoin.length - 2)
}

const convertToCastInfos = (casts) => {
  const castsArray = []
  for (let idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast)
  }
  return castsArray
}

module.exports = {
  formatTime,
  convertToStarsArray,
  http,
  convertToCastString,
  convertToCastInfos
}
