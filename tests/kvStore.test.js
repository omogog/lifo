const request = require('supertest');
const app = require('../src/app');

let server;
let port = 0;

beforeAll((done) => {
    server = app.listen(port, () => {
        port = server.address().port;  // Dynamically assign a port
        console.log(`Test server running on port ${port}`);
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

describe('Key-Value Store API', () => {
    test('should add key-value to the store', async () => {
        const response = await request(server).post('/kvstore/add').send({ key: 'name', value: 'John' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Key name added with value John');
    });

    test('should get value from the store', async () => {
        await request(server).post('/kvstore/add').send({ key: 'age', value: '25' });
        const response = await request(server).get('/kvstore/get/age');
        expect(response.statusCode).toBe(200);
        expect(response.body.value).toBe('25');
    });

    test('should return 404 if key not found or expired', async () => {
        const response = await request(server).get('/kvstore/get/nonexistent');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Key not found or expired');
    });

    test('should delete key from the store', async () => {
        await request(server).post('/kvstore/add').send({ key: 'deleteTest', value: 'some value' });
        const response = await request(server).delete('/kvstore/delete/deleteTest');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Key deleteTest deleted');
    });

    test('should return 404 after key expires', async () => {
        await request(server).post('/kvstore/add').send({ key: 'temp', value: 'temporary', ttl: 1 });

        await new Promise(resolve => setTimeout(resolve, 1500));

        const response = await request(server).get('/kvstore/get/temp');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Key not found or expired');
    });
});