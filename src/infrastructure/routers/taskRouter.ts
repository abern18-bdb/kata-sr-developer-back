import express from 'express';
import CONFIG from '../../config';
import { taskController } from '../controllers/taskController';
import authMiddleware from '../middleware/authMiddleware';
import { loginController } from '../controllers/loginController';

const TaskRouter = express.Router();

TaskRouter.post('/login', loginController.login);

TaskRouter.post(
  `${CONFIG.PATHS.TASKS.PATH}${CONFIG.PATHS.TASKS.RESOURCES.CREATE_TASK}`,
  authMiddleware,
  taskController.createTask
);

TaskRouter.get(
  `${CONFIG.PATHS.TASKS.PATH}${CONFIG.PATHS.TASKS.RESOURCES.LIST_TASKS}`,
  authMiddleware,
  taskController.getTasks
);

TaskRouter.put(
  `${CONFIG.PATHS.TASKS.PATH}`,
  authMiddleware,
  taskController.updateTask
);

TaskRouter.delete(
  `${CONFIG.PATHS.TASKS.PATH}`,
  authMiddleware,
  taskController.deleteTask
);

export default TaskRouter;
