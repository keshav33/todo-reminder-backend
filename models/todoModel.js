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

exports.getAllTodos = () => {
    return new Promise((resolve, reject) => {
        const db = getDb();
        db.collection('todos').find({}).toArray((err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result)
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