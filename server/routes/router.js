const express = require('express');
const route = express.Router(); 

const services = require('../services/render');
const controller = require('../controller/controller');
/*
 @description Root Route
 @method Get
*/
route.get('/',services.homeRoutes);
/*
 @description addUser Route
 @method POST
*/
route.get('/adduser',services.addUser)
/*
 @description Update Route
 @method POST
*/
route.get('/updateUser',services.updateUser)
//API
route.post('/api/users',controller.create)
route.get('/api/users/',controller.find)
route.put('/api/users/:id',controller.update)
route.delete('/api/users/:id',controller.delete)

module.exports= route;