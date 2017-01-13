const express = require('express')
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  console.log("middleware is called..");
  var now = new Date().toString();
  var log = `${now}: ${req.url}  ${req.method}`;
  console.log(log);
  fs.appendFile('server.log',log + '\n',(err) => {
    if(err){
      console.log('Unable to append to server.log');
    }
  });
  next();
});




app.get('/',(request, response) => {

  response.render('home.hbs',{
    pageTitle: 'WebNode',
    welcomeMsg: 'Welcome to the Den :)',
    currentYear: new Date().getFullYear()
  })
  // response.send('<h1>Hello Express</h1>');
  // response.send({
  //   name:"Gagan",
  //   likes:['Music','Movies','Reading']
  // });

});

app.get('/about',(request,response) => {
  response.render('about.hbs', {
    pageTitle: 'About Handlebar Usage',
    currentYear: new Date().getFullYear()
  });
  // response.send(':)')

})

app.get('/bad',(request,response) => {
  response.send({
    errorMessage:"Thing went bad, as they always do!"
  })
})


app.listen(3000);
