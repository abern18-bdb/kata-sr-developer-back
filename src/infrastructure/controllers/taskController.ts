import { Request, Response } from 'express';
import { taskService } from '../../application/services/taskService';
import { body, validationResult } from 'express-validator';

export const taskController = {
  createTask: [
    body('title').notEmpty().withMessage('El título es obligatorio.'),
    body('description').notEmpty().withMessage('La descripción es obligatoria.'),

    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const newTask = await taskService.createTask(req.body, req.headers['x-user']);
        res.status(201).json(newTask);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    }
  ],

  getTasks: async (req: Request, res: Response) => {
    try {
      const tasks = await taskService.getTasks();
      res.status(200).json(tasks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTask: [
    body('title').optional().notEmpty().withMessage('El título es obligatorio.'),
    body('description').optional().notEmpty().withMessage('La descripción es obligatoria.'),

    async (req: Request, res: Response) => {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: 'ID es requerido' });
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const updatedTask = await taskService.updateTask(id, req.body, req.headers['x-user']);
        if (!updatedTask) {
          return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        res.status(200).json(updatedTask);
      } catch (error: any) {
        res.status(404).json({ error: error.message });
      }
    }
  ],

  deleteTask: async (req: Request, res: Response) => {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: 'ID es requerido' });
    }
    try {
      const deleteTask = await taskService.deleteTask(id);
      if (!deleteTask) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  },
};
