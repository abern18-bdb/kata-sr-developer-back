import { Request, Response, NextFunction } from 'express';
import authMiddleware from '../../../infrastructure/middleware/authMiddleware';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
}));

describe('authMiddleware', () => {
  let req: Request;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: {} } as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return an error if there is no token', () => {
    req.headers['authorization'] = undefined;

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'No autorizado' });
  });

  it('should return an error if the token is invalid', () => {
    req.headers['authorization'] = 'invalid_token';
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(new Error('Token inválido'));
    });

    authMiddleware(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido' });
  });

  it('should pass successfully if the token is valid', () => {
    req.headers['authorization'] = 'valid_token';
    (jwt.verify as jest.Mock).mockImplementation((token, secret, callback) => {
      callback(null);
    });

    authMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
  });
});
