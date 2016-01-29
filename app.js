var express = require('express');
var exphbs  = require('express-handlebars');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();

var db = mongojs('scoreboard', ['scores']);
var ObjectId = mongojs.ObjectId;

db.on('error', function (err) {
  console.log('database error', err)
})

db.on('connect', function () {
  console.log('database connected')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function(req, res) {
  res.render('index', {title: 'Hello'})
});

app.get('/scores/', function(req, res) {
  db.scores.find(function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

app.post('/scores/', function(req, res) {
  var name = req.body.name;
  var count = req.body.count;
  db.scores.insert({name: name, count: count}, function(err, doc) {
    res.send(doc);
  });
});

app.put('/scores/', function(req, res) {
    var newCount = req.body.count;
    var id = req.body._id;
    db.scores.update({_id: ObjectId(id)}, {$set: {count: newCount}}, function(err, result, doc) {
      if (err) {
        res.send(err);
      } else {
        res.send(result)
      }
    });
});

app.get('/scores/:name', function(req, res) {
  var name = req.params.name;
  db.scores.find({name: name}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result)
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000');
})
