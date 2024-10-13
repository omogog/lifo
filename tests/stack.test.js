const request = require('supertest');
const app = require('../src/app');

let server;
let port = 0; // Let the OS choose an available port

beforeAll(() => {
    server = app.listen(port, () => {
        port = server.address().port;  // Get the random port assigned by the OS
        console.log(`Test server running on port ${port}`);
    });
});

afterAll((done) => {
    server.close(done);  // Close the server after the tests
});

describe('Stack API', () => {
    test('should add item to the stack', async () => {
        const response = await request(server).post('/stack/add').send({ item: 'Hello' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Item Hello added to stack');
    });

    test('should get item from the stack', async () => {
        await request(server).post('/stack/add').send({ item: 'World' });
        const response = await request(server).get('/stack/get');
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toBe('World');
    });

    test('should return 404 when stack is empty', async () => {
        await request(server).get('/stack/get'); // Clear stack
        const response = await request(server).get('/stack/get');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Stack is empty');
    });
});