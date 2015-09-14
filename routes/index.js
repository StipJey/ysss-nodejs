var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/', function(req, res, next) {
    if(req.query.url){
      if(req.query.short){
        db_get("short", req.query.short, function(data){
          if(data[0]){
            res.send({error: "This short name is busy"});
          } else {
            //Добавить с shortname
          }
        });
      } else {
        //добавить без shortname
      }
    }
    res.send("test");
});

router.get('/*/qr.png', function(req, res, next) {
  var url = "http://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=http://ysss.ru/" + req.url.split('/')[1];
  http.get(url, function(response) {
    response.pipe(res);
  });
});

router.get('/*/thumb_*.png', function(req, res, next) {
  var short = req.url.split('/')[1];
  var thumb = req.url.split('/')[req.url.split('/').length - 1];
  db_get("short", short, function(data){
    if(data[0]){
      var url = "http://mini.s-shot.ru/"+(thumb == 'thumb_small.png'?'1024x512/200':'1024x768/768')+"/png/?" + data[0].url;
      http.get(url, function(response) {
        response.pipe(res);
      });
    } else {
      res.send("Can't find this short link... =(");
    }
  })
});

/* GET home page. */
router.get('/*', function(req, res, next) {
  res.render('index', { title: 'URL' });
});

module.exports = router;
