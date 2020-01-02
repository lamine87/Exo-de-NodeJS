const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

//Connection mongodb
 mongoose.Promise = global.Promise;
 mongoose.connect('mongodb://localhost/vidup-dev', {
     useMongoClient: true
 })
 .then(()=> console.log('MongoDB connected....'))
 .catch(err => console.log(err));

//charger le model
require('./models/Idea');
const Idea = mongoose.model('ideas');

//handlebar middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    const title = 'Welcome';
    res.render('index', {
        title: title
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});


//route du formulaire
app.get('/ideas/add', (req, res) =>{
     res.render('ideas/add');
});

//traitement du formulaire
app.post('/ideas', (req, res) =>{
    console.log(req.body);
    res.send('ok');
} );


app.listen(port, ()=>{
    console.log(`Serveur sur le port ${port}`);
    console.log('Serveur sur le port ' + port);
})
