const express = require('express');

const app = express();

app.listen(3000);

app.use(express.json());

const urlencodedParser = express.urlencoded({ extended: false });

app.use(express.static(__dirname + '/assets'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile/:name', (req, res) => {
  const data = {
    age: 29,
    job: 'ninja',
    hobbies: ['eating', 'fighting', 'fishing'],
  };
  res.render('profile', { person: req.params.name, data });
});

app.get('/contact', (req, res) => {
  res.render('contact', { qs: req.query });
});

app.post('/contact', urlencodedParser, (req, res) => {
  console.log(typeof req.body)
  console.log(JSON.parse(JSON.stringify(req.body)));
  res.render('contact-success', { data: req.body });
});
