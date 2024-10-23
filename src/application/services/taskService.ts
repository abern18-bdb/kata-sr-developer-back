import { initDatabase } from '../../database';

const findTaskById = async (db: any, id: any) => {
  const task = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
  return task;
};

export const taskService = {
  createTask: async (taskData: any, user: any) => {
    const db = await initDatabase();
    const { title, description } = taskData;
    const result = await db.run('INSERT INTO tasks (title, description, user_name) VALUES (?, ?, ?)', [title, description, user]);
    return { id: result.lastID, title, description };
  },

  getTasks: async () => {
    const db = await initDatabase();
    return db.all('SELECT * FROM tasks');
  },

  updateTask: async (id: any, taskData: any, user: any) => {
    const db = await initDatabase();
    const existingTask = await findTaskById(db, id);

    if (!existingTask) {
      throw new Error('Tarea no encontrada');
    }

    const { title, description } = taskData;
    await db.run('UPDATE tasks SET title = ?, description = ?, "status" = true, user_name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [title, description, user, id]);
    return { id, title, description };
  },

  deleteTask: async (id: any) => {
    const db = await initDatabase();
    const existingTask = await findTaskById(db, id);

    if (!existingTask) {
      throw new Error('Tarea no encontrada');
    }
    await db.run('DELETE FROM tasks WHERE id = ?', [id]);
    return "ok";
  },
};
