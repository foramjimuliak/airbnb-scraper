import express from 'express';
import routes from './routes/routes.js';

const app = express();

app.use(routes);

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(3001, () => console.log('Example app listening on port 3001!'))