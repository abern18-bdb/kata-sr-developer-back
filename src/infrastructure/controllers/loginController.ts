import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export const loginController = {
  login: (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (
      (username === "admin" && password === "admin") ||
      (username === "otro_user" && password === "otro_user")
    ) {
      //const token = jwt.sign({ user: username }, "secret_token", { expiresIn: '5m' });
      const token = jwt.sign({ user: username }, "secret_token", { expiresIn: '1h' });
      return res.json({ token });
    }

    return res.status(401).json({ error: 'Credenciales inválidas' });
  },
};