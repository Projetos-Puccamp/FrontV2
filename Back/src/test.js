const app = require('./server');
const request = require('supertest');

process.once("SIGUSR2", () => server.close(err => process.kill(process.pid, "SIGUSR2")));

describe('Teste da API', () => {
  test('Deve retornar status 200 ao acessar a rota /usuers', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
  });
});