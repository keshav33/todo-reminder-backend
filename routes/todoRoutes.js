const todoRouter = require('express').Router();
const {
    getAllTodos,
    addTodo,
    deleteTodoById,
    markTodoCompleted
} = require('../controllers/todoController');
const { authenticateToken } = require('../controllers/userController')

todoRouter.post('/addtodo', authenticateToken, addTodo);
todoRouter.get('/alltodos', authenticateToken, getAllTodos);
todoRouter.delete('/delete/:id', authenticateToken, deleteTodoById);
todoRouter.put('/setcompleted', authenticateToken, markTodoCompleted);

module.exports = todoRouter