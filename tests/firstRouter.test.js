const request = require('supertest');
const app = require('../src/app');

beforeEach(async () => {});
afterEach(async () => {});

test('Test /test endpoint', async () => {
    await request(app).get('/test').send({}).expect(200);
});
