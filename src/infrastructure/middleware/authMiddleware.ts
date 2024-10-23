import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  jwt.verify(token, "secret_token", (err) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    next();
  });
};

export default authMiddleware;
