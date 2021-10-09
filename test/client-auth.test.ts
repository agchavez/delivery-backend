import supertest from 'supertest';


import clientModel from '../src/models/client.model';
import Server from '../src/models/server.model';


const server = new Server();
const app = supertest(server.app);
describe('Register client', () => {
    test('register new successful client ', async() => {
        await clientModel.deleteOne({"email":"test@test.com"})
        await app.post('/api/client/register')
        .send({
            "email":"test@test.com",
            "firstName":"Angel",
            "lastName":"Chavez",
            "phone":31998850,
            "password":"test123"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        });

    test('register new error client ', async() => {
        await app.post('/api/client/register')
        .send({
            "email":"test@test.com",
            "firstName":"Angel",
            "lastName":"Chavez",
            "phone":31998850,
            "password":"test123"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        });
    });
    
describe('Login client', () => {
    test('Login client verified email', async() => {
            await app.get('/api/client/login')
            .send({
                "email":"test@test.com",
                "password":"test123"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            });

    test('Login client successful', async() => {
        await app.get('/api/client/login')
        .send({
            "email":"angelchavez.325.ag@gmail.com",
            "password":"test123"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        });
        });
    
