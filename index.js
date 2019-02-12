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

server.post('/api/users', (req, res) => {
  const user = req.body;
  const { name, bio } = req.body;

  if (!name || !bio) {
    res.status(400).json({
      success: false,
      errorMessage: 'Please provide name and bio for the user.'
    });
  }
  db.insert(user).then(user =>
    res
      .status(201)
      .json({ success: true, user })
      .catch(err =>
        res.status(500).json({
          success: false,
          error: 'There was an error while saving the user to the database'
        })
      )
  );
});

server.listen(4000, () => {
  console.log('working');
});
