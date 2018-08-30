// EXPRESS CORE
var express = require('express');
var app = express();

// EXTENSIONS
var http = require('http');
var exphbs  = require('express-handlebars');
var giphy = require('giphy-api')();

// DECLARATIONS AND THINGS
app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// ROUTES
// req means request, res means response
app.get('/hello-gif', function (req, res) {
  var gifUrl = 'http://media2.giphy.com/media/gYBVM1igrlzH2/giphy.gif'
  res.render('hello-gif', {gifUrl: gifUrl})
});

app.get('/greetings/:name', function (req, res) {
  var name = req.params.name;
  res.render('greetings', {name: name});
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

// QUERY THE GIPHY API
app.get('/', function (req, res) {
  console.log(req.query.term)
  var queryString = req.query.term;
  // searches giphy using the wrapper
  if (typeof queryString === 'string') {
    giphy.search(req.query.term, function (err, response) {
        res.render('home', {gifs: response.data})
      });
    } else {
      // I made it not get random gifs on the home page for the sake of my poor computer
      res.render('home');
    }
})
