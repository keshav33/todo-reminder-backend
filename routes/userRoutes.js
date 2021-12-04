const userRouter = require('express').Router();
const {
    userSignup,
    userLogin,
    googleLogin
} = require('../controllers/userController')

userRouter.post('/signup', userSignup);
userRouter.post('/login', userLogin);
userRouter.post('/google/login', googleLogin);

module.exports = userRouter;