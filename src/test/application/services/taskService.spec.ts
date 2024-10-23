import { initDatabase } from "../../../database";
import { taskService } from "../../../application/services/taskService";

jest.mock('../../../database', () => ({
    initDatabase: jest.fn(),
}));

describe('taskService', () => {
    let db: any;

    beforeEach(async () => {
        db = {
            get: jest.fn(),
            all: jest.fn(),
            run: jest.fn().mockResolvedValue({ lastID: 1 }),
        };
        (initDatabase as jest.Mock).mockResolvedValue(db);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createTask', () => {
        it('should create a task and return', async () => {
            const taskData = { title: 'Test Task', description: 'Test Description' };
            const user = 'testUser';

            const result = await taskService.createTask(taskData, user);

            expect(db.run).toHaveBeenCalledWith(
                'INSERT INTO tasks (title, description, user_name) VALUES (?, ?, ?)',
                [taskData.title, taskData.description, user]
            );
            expect(result).toEqual({ id: 1, title: 'Test Task', description: 'Test Description' });
        });
    });

    describe('getTasks', () => {
        it('should return all tasks', async () => {
            const mockTasks = [{ id: 1, title: 'Test Task', description: 'Test Description' }];
            db.all.mockResolvedValue(mockTasks);

            const result = await taskService.getTasks();

            expect(db.all).toHaveBeenCalledWith('SELECT * FROM tasks');
            expect(result).toEqual(mockTasks);
        });
    });

    describe('updateTask', () => {
        it('should update a task and return it', async () => {
            const taskData = { title: 'Updated Task', description: 'Updated Description' };
            const user = 'testUser';
            const taskId = 1;

            db.get.mockResolvedValue({ id: taskId, title: 'Old Task', description: 'Old Description' });

            const result = await taskService.updateTask(taskId, taskData, user);

            expect(db.get).toHaveBeenCalledWith('SELECT * FROM tasks WHERE id = ?', [taskId]);
            expect(db.run).toHaveBeenCalledWith(
                'UPDATE tasks SET title = ?, description = ?, user_name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [taskData.title, taskData.description, user, taskId]
            );
            expect(result).toEqual({ id: taskId, title: 'Updated Task', description: 'Updated Description' });
        });

        it('should show an error if the task does not exist', async () => {
            const taskData = { title: 'Updated Task', description: 'Updated Description' };
            const user = 'testUser';
            const taskId = 999;

            db.get.mockResolvedValue(null);

            await expect(taskService.updateTask(taskId, taskData, user)).rejects.toThrow('Tarea no encontrada');
        });
    });

    describe('deleteTask', () => {
        it('should delete a task', async () => {
            const taskId = 1;

            db.get.mockResolvedValue({ id: taskId, title: 'Test Task', description: 'Test Description' });

            const result = await taskService.deleteTask(taskId);

            expect(db.get).toHaveBeenCalledWith('SELECT * FROM tasks WHERE id = ?', [taskId]);
            expect(db.run).toHaveBeenCalledWith('DELETE FROM tasks WHERE id = ?', [taskId]);
            expect(result).toEqual("ok");
        });

        it('should show an error if the task does not exist', async () => {
            const taskId = 999;

            db.get.mockResolvedValue(null);

            await expect(taskService.deleteTask(taskId)).rejects.toThrow('Tarea no encontrada');
        });
    });
});
