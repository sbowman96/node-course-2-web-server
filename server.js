const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');


app.use ((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log +'\n', (err) => {
if (err) {
  consol.log('unable to append log')
}
});
  next();
// });
// app.use((req, res, next) => {
//   res.render ("maint.hbs");
});
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});

app.get ('/' ,(req, res) => {
    res.render('home.hbs',{
    pageTitle: 'Home B Page',
    welcomeMessage: "Welcome to the interactive website",

  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: "ABooout Page",
    });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: "Bowmans's Projects Page",
    });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to help'
});

});

app.listen(port, () => {
  console.log(`Port is ${port}`);
});
