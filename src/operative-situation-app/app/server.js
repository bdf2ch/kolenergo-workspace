"use strict";
const express = require('express');
const parser = require('body-parser');
const process = require('process');
const path = require('path');


process
  .on('uncaughtException', (err) => {
  console.error(err.stack);
console.log("Node NOT Exiting...");
})
.on('ECONNRESET', (err) => {
  console.error(err.stack);
console.log("Node NOT Exiting...");
})
.on('ETIMEDOUT', (err) => {
  console.error(err.stack);
console.log("Node NOT Exiting...");
});


var app = express();
app.use(function (req, res, next) {
  req.on('error', (err) => {
    console.log('error catched', err);
});
  next();
})
  .use(function (req, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    response.header('Access-Control-Allow-Credentials', true);
    next();
  })
  .use(express.static(path.resolve('C:\\development\\web\\angular\\kolenergo-workspace\\dist\\operative-situation-app')))
  //.use(express.static('/var/wwwn/phonebook/dist/'))
  .get('*', (req, res) => {
  res.sendFile(path.resolve('C:\\development\\web\\angular\\kolenergo-workspace\\dist\\operative-situation-app\\index.html'));
})
.use(parser.json())
  .listen(8888, function () {
    console.log('Server started at 8888');
  }).on('error', function(err){
    console.log('ON ERROR HANDLER');
    console.log(err);
  });
