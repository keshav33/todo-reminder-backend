const todoRouter = require('express').Router();
const {
    getAllTodos,
    addTodo,
    deleteTodoById
} = require('../controllers/todoController')

todoRouter.post('/addtodo', addTodo);
todoRouter.get('/alltodos', getAllTodos);
todoRouter.delete('/delete/:id', deleteTodoById);

module.exports = todoRouter