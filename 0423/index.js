const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/practics', (req, res) => {
  res.render('practics');
});

app.get('/register', (req, res) => {

  const userData = {
    username: req.query.username,
    gender: req.query.gender,
    birthYear: req.query.birthYear,
    birthMonth: req.query.birthMonth,
    birthDay: req.query.birthDay,
    hobby: req.query.hobby
  };

  res.send(userData);
});

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}....`);
});