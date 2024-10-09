const express = require('express'); 
const app = express();
const path = require('path'); 
const port = 3000;

app.use(express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'public/index.html'))
}); 

app.get('/portfolio', function (req, res) {
    res.sendFile(path.join(__dirname,'public/portfolio.html'))
}); 

app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname,'public/home.html'))
}); 

app.get('/experience', function (req, res) {
    res.sendFile(path.join(__dirname,'public/experience.html'))
}); 

app.get('/projects', function (req, res) {
    res.sendFile(path.join(__dirname,'public/projects.html'))
}); 

app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname,'public/contact.html'))
}); 

app.listen(port, () => {
  console.log(`Server running at <http://localhost>:${port}/`);
});