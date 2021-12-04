const {
    insertNewUser,
    getExistingUser
} = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userSignup = (req, res) => {
    const user = req.body
    getExistingUser(user)
        .then(async result => {
            if (result) {
                throw { err: 'user already exist', message: 'User Already Exist', code: 403 }
            } else {
                try {
                    const hashedPassword = await bcrypt.hash(user.password, 10);
                    const { username, email } = user;
                    const newUser = {
                        username,
                        email,
                        password: hashedPassword
                    }
                    insertNewUser(newUser)
                        .then(() => {
                            res.status(202).send('Ok');
                        }).catch(err => {
                            console.log(err);
                            throw { err: err, message: 'Error While Signing Up', code: 500 };
                        })
                } catch {
                    throw { err: err, message: 'Error While Signing Up', code: 500 };
                }
            }
        }).catch(error => {
            res.status(error.code).send({ message: error.message, code: error.code })
        })
}

exports.userLogin = (req, res) => {
    const user = req.body;
    getExistingUser(user)
        .then(async result => {
            if (result) {
                if (await bcrypt.compare(user.password, result.password)) {
                    const tokenBody = { username: result.username, email: result.email };
                    const jwtToken = jwt.sign(tokenBody, process.env.ACCESS_TOKEN_SECRET);
                    res.status(200).send({ accessToken: jwtToken, username: result.username, email: result.email });
                } else {
                    res.status(401).send({ message: 'Incorrect Password', code: 401 });
                }
            } else {
                res.status(401).send({ message: 'No User Exist', code: 401 });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Unable To Login', code: 500 });
        })
}

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized User' });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send({ message: 'Access Forbidden', code: 403 });
        }
        req.user = user;
        next();
    })
}

exports.googleLogin = (req, res) => {
    const user = req.body.user;
    getExistingUser(user)
        .then(result => {
            const { username, email } = user;
            if (result) {
                const tokenBody = { username, email };
                const jwtToken = jwt.sign(tokenBody, process.env.ACCESS_TOKEN_SECRET);
                res.status(200).send({ accessToken: jwtToken, username: result.username, email: result.email });
            } else {
                const newUser = {
                    username,
                    email,
                    googleLogin: true
                }
                insertNewUser(newUser)
                .then(() => {
                    const tokenBody = { username, email };
                    const jwtToken = jwt.sign(tokenBody, process.env.ACCESS_TOKEN_SECRET);
                    res.status(200).send({ accessToken: jwtToken, username, email });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({ message: 'Unable To Login', code: 500 });
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send({ message: 'Unable To Login', code: 500 });
        })
}