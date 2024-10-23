import request from 'supertest';
import express from 'express';
import { taskController } from '../../../infrastructure/controllers/taskController';
import { taskService } from '../../../application/services/taskService';

const app = express();
app.use(express.json());

app.post('/tasks', taskController.createTask);
app.get('/tasks', taskController.getTasks);
app.put('/tasks', taskController.updateTask);
app.delete('/tasks', taskController.deleteTask);

jest.mock('../../../application/services/taskService');

describe('taskController', () => {
  const mockUser = 'Test User';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createTask', () => {
    it('should create a task and return', async () => {
      const newTask = { id: 1, title: 'Test Task', description: 'Test Description', completed: false };
      (taskService.createTask as jest.Mock).mockResolvedValue(newTask);

      const response = await request(app)
        .post('/tasks')
        .set('x-user', mockUser)
        .send({ title: 'Test Task', description: 'Test Description' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newTask);
    });

    it('should return an error the title is missing', async () => {
      const newTask = { id: 1, description: 'Test Description', completed: false };
      (taskService.createTask as jest.Mock).mockResolvedValue(newTask);

      const response = await request(app)
        .post('/tasks')
        .set('x-user', mockUser)
        .send({ description: 'Test Description' });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('El título es obligatorio.');
    });

    it('should handle service errors post', async () => {
      (taskService.createTask as jest.Mock).mockRejectedValue(new Error('Error al crear la tarea'));

      const response = await request(app)
        .post('/tasks')
        .set('x-user', mockUser)
        .send({ title: 'Test Task', description: 'Test Description' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Error al crear la tarea');
    });
  });

  describe('getTasks', () => {
    it('should return the list of tasks', async () => {
      const tasks = [{ id: 1, title: 'Test Task', description: 'Test Description', completed: false }];
      (taskService.getTasks as jest.Mock).mockResolvedValue(tasks);

      const response = await request(app).get('/tasks');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(tasks);
    });

    it('should handle service errors get', async () => {
      (taskService.getTasks as jest.Mock).mockRejectedValue(new Error('Error al obtener las tareas'));

      const response = await request(app).get('/tasks');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Error al obtener las tareas');
    });
  });

  describe('updateTask', () => {
    it('should update a task and return', async () => {
      const updatedTask = { id: 1, title: 'Updated Task', description: 'Updated Description', completed: true };
      (taskService.updateTask as jest.Mock).mockResolvedValue(updatedTask);

      const response = await request(app)
        .put('/tasks?id=1')
        .set('x-user', mockUser)
        .send({ title: 'Updated Task', description: 'Updated Description' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedTask);
    });

    it('should return an error if the ID is missing', async () => {
      const response = await request(app)
        .put('/tasks')
        .set('x-user', mockUser)
        .send({ title: 'Updated Task' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ID es requerido');
    });

    it('should handle validation errors', async () => {
      const updatedTask = { id: 1, description: 'Updated Description', completed: true };
      (taskService.updateTask as jest.Mock).mockResolvedValue(updatedTask);
      const response = await request(app)
        .put('/tasks?id=1')
        .set('x-user', mockUser)
        .send({ title: '' });

      expect(response.status).toBe(400);
      expect(response.body.errors[0].msg).toBe('El título es obligatorio.');
    });

    it('should handle service errors put', async () => {
      (taskService.updateTask as jest.Mock).mockRejectedValue(new Error('Error al actualizar la tarea'));

      const response = await request(app)
        .put('/tasks?id=1')
        .set('x-user', mockUser)
        .send({ title: 'Updated Task', description: 'Updated Description' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Error al actualizar la tarea');
    });

    it('should return an error if the task is not found', async () => {
      (taskService.updateTask as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .put('/tasks?id=1')
        .set('x-user', mockUser)
        .send({ title: 'Updated Task', description: 'Updated Description' });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Tarea no encontrada');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      (taskService.deleteTask as jest.Mock).mockResolvedValue(true);

      const response = await request(app).delete('/tasks?id=1');

      expect(response.status).toBe(204);
    });

    it('should return an error if the ID is missing delete', async () => {
      const response = await request(app).delete('/tasks');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('ID es requerido');
    });

    it('should handle service errors delete', async () => {
      (taskService.deleteTask as jest.Mock).mockRejectedValue(new Error('Error al eliminar la tarea'));

      const response = await request(app).delete('/tasks?id=1');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Error al eliminar la tarea');
    });

    it('should return an error if the task is not found delete', async () => {
      (taskService.deleteTask as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete('/tasks?id=1');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Tarea no encontrada');
    });
  });
});
