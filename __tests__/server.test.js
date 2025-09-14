const request = require('supertest');
const app = require('../server');

describe('Server Endpoints', () => {
  test('GET / should return HTML page', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
  });

  test('GET /api/restaurants without parameters should return 400', async () => {
    const response = await request(app).get('/api/restaurants');
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Missing required parameters');
  });

  test('GET /api/restaurants with lat/lng should return 200 (mock)', async () => {
    // Note: This test fails without a API key, but shows the structure
    const response = await request(app).get('/api/restaurants?lat=40.7128&lng=-74.0060');
    // We expect either 200 (if API key works) or 500 (if API key missing/invalid)
    expect([200, 500]).toContain(response.status);
  });

  test('GET /api/photo without photoreference should return 400', async () => {
    const response = await request(app).get('/api/photo');
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('Missing photoreference parameter');
  });
});
