var express = require('express');
var router = express.Router();
 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/', function(req, res, next) {
    if(req.query.url){
      if(req.query.short){
        
      } else {
        // db.query('INSERT INTO url (url, short) Values ("'+req.query.url+'", "test")', function(err, rows){
        //   console.log(err);
        // });
        
      }
    }
    console.log(checkShort());
    res.send(checkShort());
});

router.get('/*/qr.png', function(req, res, next) {
  var url = "http://chart.apis.google.com/chart?cht=qr&chs=150x150&chl=http://ysss.ru/" + req.url.split('/')[1];
  res.send(url);
});

/* GET home page. */
router.get('/*', function(req, res, next) {
  res.render('index', { title: 'URL' });
});

module.exports = router;
