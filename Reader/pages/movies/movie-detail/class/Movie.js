var util = require('../../../../utils/util.js')
class Movie {
    constructor(url) {
        this.url = url;
    }
    //cb为callback回调函数
    getMovieData(cb) {
        this.cb = cb;
        util.http(this.url, this.processDoubanData.bind(this));
    }

    processDoubanData(data) {
        if (!data) {
            return;
        }
        var director = {
            avatar: "",
            name: "",
            id: ""
        }
        if (data.directors[0] != null) {
            if (data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars.large

            }
            director.name = data.directors[0].name;
            director.id = data.directors[0].id;
        }
        var movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: util.convertToStarsArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: util.convertToCastString(data.casts),//演员姓名用'/'分割
            castsInfo: util.convertToCastInfos(data.casts),//演员信息排空
            summary: data.summary
        }
        this.cb(movie);
    }
}

export {Movie}