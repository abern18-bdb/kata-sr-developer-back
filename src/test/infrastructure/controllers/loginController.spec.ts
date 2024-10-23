import request from 'supertest';
import app from "../../../app";

describe('Login Controller', () => {
  it('should return a token for valid credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'admin', password: 'admin' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(typeof response.body.token).toBe('string');
  });

  it('should return a token for another valid user', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'otroUser', password: 'otroUser' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({ username: 'invalid', password: 'credentials' });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Credenciales inválidas');
  });
});
