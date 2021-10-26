import supertest from 'supertest';

import Server from '../src/models/server.model';


const server = new Server();
const app = supertest(server.app);

describe('Comments', () => {
    test('Send email',async () => {
        await app.post('/api/client/comment')
        .send({
            "email":"test2@test.com",
            "firstName":"Angel",
            "lastName":"Chavez",
            "msj":"Comentario de prueba nada mas"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        });
    })
