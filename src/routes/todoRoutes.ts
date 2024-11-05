import express from 'express';
import todoController from '../controllers/todoController';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Route to get todo items
router.post('/todos', todoController.createTodoItem.bind(todoController)); 

// Read
router.get('/todos', todoController.getTodoItems.bind(todoController)); 

// Update
router.put('/todos/:id', todoController.updateTodoItem.bind(todoController)); 

// Delete
router.delete('/todos/:id', todoController.removeTodoItem.bind(todoController)); 


export default router;
