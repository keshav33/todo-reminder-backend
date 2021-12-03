const {
    insertTodo,
    getAllTodos,
    deleteTodo,
    setCompleted
} = require('../models/todoModel')

exports.getAllTodos = (req, res) => {
    getAllTodos()
    .then(result => {
        res.status(200).send(result)
    }).catch(err => {
        console.log(err);
        res.status(500).send({message: 'Unable To Get All Records', code: 500});
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
        res.status(500).send({message: 'Unable To Insert Data', code: 500});
    })
}

exports.deleteTodoById = (req, res) => {
    const id = req.params.id;
    deleteTodo(id)
    .then(() => {
        res.status(202).send('Deleted');
    }).catch(err => {
        console.log(err);
        res.status(500).send({message: 'Unable To Delete', code: 500});
    })
}

exports.markTodoCompleted = (req, res) => {
    const {id, checked} = req.body;
    setCompleted(id, checked)
    .then(() => {
        res.status(202).send('Ok');
    }).catch(err => {
        console.log(err);
        res.status(500).send({message: 'Unable To Mark Complete', code: 500});
    })
}