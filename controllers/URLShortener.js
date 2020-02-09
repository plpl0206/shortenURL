const shortid = require('shortid');
const validUrl = require('valid-url');
const redis = require('../utils/redisClient').getRedisInstance();
const shortenURLModel = require('../models/shortenURL');

class URLShortener {

    async shorten(req, res, next) {

        const url = req.body.url;

        console.log(req.headers.origin);

        if (validUrl.isUri(url)){

            const urlCode = shortid.generate();
            const shortURL = req.headers.origin + '/' + urlCode;

            const [shortenURLRecord, created] = await shortenURLModel.findOrCreate({ 
                where: { originalURL :url },
                defaults: {
                    urlCode: urlCode, 
                    originalURL: url, 
                    shortURL: shortURL
                }
            });

            res.render('shorten', { link: created ? shortURL : shortenURLRecord.shortURL});

            redis.set(urlCode, url, 'EX', 86400*30);

        } else {
            res.status(400).send('Invaild Vase Url');
        }
    }

    async getURL(req, res, next){

        const key = req.params.key;
        redis.get(key, async (error, result) => {
            if (error || result == undefined){

                const shortenURLRecord = await shortenURLModel.findOne({ where: { urlCode : key}})

                if (shortenURLRecord){
                    res.redirect(shortenURLRecord.originalURL);
                } else {
                    res.redirect('/');
                }

            } else {
                res.redirect(result);
            }
        });
    }
}

module.exports = {
    URLShortener: URLShortener
};