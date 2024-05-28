const { Router } = require('express');
const UserController = require('./apps/controllers/UserController');

const routes = new Router();

routes.post('/user', UserController.create);

routes.get("/health", (req,res) => {
    return res.send({message: "Connected with success!"});
});

module.exports = routes;