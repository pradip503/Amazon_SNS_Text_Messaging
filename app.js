
//express initialization
var express = require('express');
var app = express();
var bodyParser= require('body-parser');
var messageRoute = require('./sns');

//body parser
app.use(bodyParser.urlencoded({ extended: false }));

//set view engine
app.set('view-engine', 'hbs');

//route to load the view
app.get('/', (req, res) => {
    res.render('index.hbs');
});

//route to send message
app.post('/sendMessage',messageRoute.sendMessage);

const PORT = process.env.PORT || 4500;
app.listen(PORT, (error) => {
    if(error){
        console.log(error);
    } else {
        console.log('Listening to port '+ PORT);
    }
})