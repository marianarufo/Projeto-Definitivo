const { Router } = require('express');
const schemaValidator = require('./apps/middlewares/schemaValidator');

const UserController = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json')

const routes = new Router();

routes.post('/user', schemaValidator(userSchema), UserController.create);


routes.get("/health", (req,res) => {
    return res.send({message: "Connected with success!"});
});

routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);


module.exports = routes;