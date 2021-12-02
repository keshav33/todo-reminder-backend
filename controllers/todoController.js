const {
    insertTodo,
    getAlTodos,
    deleteTodo
} = require('../models/todoModel')

exports.getAllTodos = (req, res) => {
    getAlTodos()
    .then(result => {
        res.status(200).send(result)
    }).catch(err => {
        console.log(err);
        res.status(500).send('Unable To Get All Records');
    })
}

exports.addTodo = (req, res) => {
    const {todo, reminderDateTime, completed} = req.body;
    const date = reminderDateTime.split('T')[0];
    const time = reminderDateTime.split('T')[1];
    const todoBody = {
        todo,
        date,
        time,
        completed
    };
    insertTodo(todoBody)
    .then(() => {
        res.status(202).send('Ok');
    }).catch(err => {
        console.log(err);
        res.status(500).send('Unable To Insert Data');
    })
}

exports.deleteTodoById = (req, res) => {
    const id = req.params.id;
    deleteTodo(id)
    .then(() => {
        res.status(202).send('Deleted');
    }).catch(err => {
        console.log(err);
        res.status(500).send('Unable To Delete');
    })
}