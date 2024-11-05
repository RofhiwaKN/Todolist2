import { Request, Response } from 'express'; // Importing Express types for request and response
import { PrismaClient } from '@prisma/client'; // Importing Prisma client to connect to the database

const prisma = new PrismaClient();

class TodoController {
     
      async getTodoItems( req: Request, res: Response ) {
        try {
            const todoItems = await prisma.todotbl.findMany();
            res.json(todoItems);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Unable to fetching todo items' });
        }
    }

    async createTodoItem(req: Request, res: Response) {
        const { name } = req.body;

        try {
            const newTodo = await prisma.todotbl.create({
                data: {
                    name: name, 
                    isComplete: false, 
                },
            });
            res.status(201).json(newTodo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: ' Unable  to creating todo item' });
        }
    }
   
    async updateTodoItem(req: Request, res: Response) {
        const { id } = req.params;
        const { name, isComplete } = req.body;

        try {
            const updatedTodo = await prisma.todotbl.update({
                where: { id: Number(id) },
                data: {
                    name: name,
                    isComplete: isComplete,
                },
            });
            res.json(updatedTodo);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error updating todo item' });
        }
    }
    // this will remove the 
    async removeTodoItem(req: Request, res: Response) {
        const { id } = req.params;

        try {
            await prisma.todotbl.delete({
                where: { id: Number(id) },
            });
            res.json({ message: 'Todo item has been successfully removed ' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Unable to removed  todo item' });
        }
    }

     
}

export default new TodoController(); 
