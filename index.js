require('dotenv').config();

const express = require('express');
const notion = require('./notion.js');
const bannerbear = require('./bannerbear.js');
var app = express();
var todoTasks;


app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

app.get('/notion-todo-wallpaper', async (req, res) => {

  var hasChange = false;
  var imageUrl = '';
  
  // Step 1. Get the To-do List from the Notion Database
  var result = await notion.getTodoTasks();
  
  var hasChange = JSON.stringify(todoTasks) !== JSON.stringify(result);

  // Step 2. Generate a Wallpaper Using Bannerbear
  if (hasChange) {
    imageUrl = await bannerbear.generateWallpaper(result);
  }

  todoTasks = result;

  res.send(JSON.stringify({ hasChange: hasChange, imageUrl: imageUrl }));
})