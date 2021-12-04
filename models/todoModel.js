const { getDb } = require('../utils/mongo');
const mongodb = require('mongodb');

exports.insertTodo = (todoBody) => {
    return new Promise((resolve, reject) => {
        const db = getDb();
        db.collection('todos').insertOne(todoBody, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    })
}

exports.getAllTodos = (user) => {
    const { email } = user;
    return new Promise((resolve, reject) => {
        const db = getDb();
        db.collection('users').aggregate([
            {
                $lookup:
                {
                    from: 'todos',
                    localField: 'email',
                    foreignField: 'email',
                    as: 'userTodos'
                }
            }
        ]).toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                const userTodos = result.find(res => res.email === email);
                resolve(userTodos);
            }
        });
    })
}

exports.deleteTodo = (id) => {
    return new Promise((resolve, reject) => {
        const db = getDb();
        const query = { _id: new mongodb.ObjectID(id) };
        db.collection('todos').deleteOne(query, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

exports.setCompleted = (id, checked) => {
    return new Promise((resolve, reject) => {
        const db = getDb();
        const query = { _id: new mongodb.ObjectID(id) };
        const update = { $set: { completed: checked } };
        db.collection('todos').updateOne(query, update, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}