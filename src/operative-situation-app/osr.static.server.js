"use strict";
const express = require('express');
const parser = require('body-parser');
const path = require('path');
const process = require('process');

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
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Credentials', true);
    next();
  })
  .use(express.static('../../dist/operative-situation-app'))
  .use(parser.json())
  .get('*', (req, res) => {
    res.sendFile(path.resolve('../../dist/operative-situation-app/index.html'));
  })
  .listen(8888, function () {
    console.log('Server started at 8888');
  }).on('error', function(err){
  console.log('ON ERROR HANDLER');
  console.log(err);
});






