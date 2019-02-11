// implement your API here
const express = require('express');
const server = express();
const db = require('./data/db.js');

server.use(express.json());

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json({ success: true, users });
    })
    .catch(err => ({
      success: false,
      error: 'The users information could not be retrieved.'
    }));
});

server.listen(4000, () => {
  console.log('working');
});
