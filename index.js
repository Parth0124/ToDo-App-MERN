  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require("path")
  
  const app = express();
  
  app.use(bodyParser.json());
  
  let todos = [];
  
  app.get('/todos', (req, res) => {
    res.json(todos);
  });
  
  app.post('/todos', (req, res) => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000), // unique random id
      title: req.body.title,
      description: req.body.description
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  });
  
  app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));  //find index when given an array and the id of the todo, searches through the array and when finds the particular id, gives back the index.
    if (todoIndex === -1) {
      res.status(404).send();
    } else {
      todos.splice(todoIndex, 1);
      res.status(200).send();
    }
  });

  app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "index.html"));
  })

  
  // for all other routes, return 404
  app.use((req, res, next) => {
    res.status(404).send();
  });

  
  app.listen(3000);