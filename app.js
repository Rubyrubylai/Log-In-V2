const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const login = require('./login.js')
const session = require('express-session')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  secret: 'login',
  resave: false,
  saveUninitialized: true
}))

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req,res) => {
  const input = req.body  
  const isUser = login(input)
  if(isUser){
      req.session.name = login(input)
      res.redirect('/')
    }
  else{
    res.render('login', {message: 'Account or password is wrong'})
  }
})

app.get('/', (req, res) => {
  if(req.session.name){
    res.render('home', {name: req.session.name})
  }
  else{
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if(err){
      res.redirect('/')
    }
    else{
      res.redirect('/login')
    }
  })
})

app.listen(3000, () => {
  console.log('app is listening!')
})