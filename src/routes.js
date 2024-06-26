const { Router } = require('express');
const { upload } = require('./configs/multer')
const schemaValidator = require('./apps/middlewares/schemaValidator');

const AuthenticationMiddleware = require('./apps/middlewares/authentication');
const AuthenticationMaster = require('./apps/middlewares/authenticationMaster');

const AuthenticationController = require('./apps/controllers/AuthenticationController');
const authSchema = require('./schema/auth.schema.json');


const UserController = require('./apps/controllers/UserController');
const userSchema = require('./schema/create.user.schema.json');

const FileController = require('./apps/controllers/FileController');

const PostController = require('./apps/controllers/PostController')
const postSchema = require('./schema/post.schema.json');


const routes = new Router();

routes.post('/user', schemaValidator(userSchema), UserController.create);

routes.post('/auth', schemaValidator(authSchema), AuthenticationController.authenticate);


routes.get("/health", (req,res) => {
    return res.send({message: "Connected with success!"});
});

routes.get('/user-profile', UserController.userProfile)
routes.get('/user-profile', UserController.userProfile)
routes.get('/list-posts', PostController.listPosts);
routes.put('/like/:id', PostController.addLike);

routes.use(AuthenticationMiddleware);

routes.post('/forgot-password', UserController.rescue);

routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);
routes.put('/user', UserController.update);
routes.delete('/user', UserController.delete);

routes.post('/upload', upload.single('image'), FileController.upload);

routes.post('/post', schemaValidator(postSchema), PostController.create);
routes.delete('/post/:id', PostController.delete);
routes.put('/post/:id', PostController.update);


routes.use(AuthenticationMaster);

routes.get('/list-all-posts', PostController.listAllPosts);
routes.get('/list-all-users', UserController.listAllUsers);



module.exports = routes;