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
    .catch(err =>
      res.status(500).json({
        success: false,
        error: 'The users information could not be retrieved.'
      })
    );
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'The user information could not be retrieved.'
        });
      } else {
        res.status(200).json({ success: true, user });
      }
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        error: 'The users information could not be retrieved.'
      })
    );
});

server.post('/api/users', (req, res) => {
  const user = req.body;
  const { name, bio } = req.body;

  if (!name || !bio) {
    return res.status(400).json({
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

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;

  db.remove(id)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'The user with the specified ID does not exist.'
        });
      }
      res
        .status(200)
        .json({ success: true, message: 'The user was deleted successfully' });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        error: 'There was an error while deleting the user from the database'
      })
    );
});

server.put('/api/users/:id', (req, res) => {
  const { name, bio } = req.body;
  const id = req.params.id;
  const body = req.body;

  if (!name || !bio) {
    return res.status(400).json({
      success: false,
      errorMessage: 'Please provide name and bio for the user.'
    });
  }

  db.update(id, body)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'The user with the specified ID does not exist.'
        });
      }
      res.status(200).json({
        success: true,
        message: 'resource updated successfully',
        user
      });
    })
    .catch(err =>
      res.status(500).json({
        success: false,
        error: 'There was an error while updating the user'
      })
    );
});

server.listen(4000, () => {
  console.log('working');
});
