var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

var shorten = require('./routes/urlshorten');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.set('port', (process.env.port || 3000));

app.get('/', function (req, res) {
  res.render('index');
});


app.use('/', shorten);

app.listen(app.get('port'), () => {
  console.log('listening on port ' + app.get('port'));
});



