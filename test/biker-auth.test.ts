import supertest from 'supertest';


import biker from '../src/models/biker.model';
import Server from '../src/models/server.model';


const server = new Server();
const app = supertest(server.app);
describe('Register biker', () => {
    test('register new successful biker ', async() => {
        await biker.deleteOne({"email":"test2@test.com"})
        await app.post('/api/biker/register')
        .send({
            "email":"test2@test.com",
            "firstName":"Angel",
            "lastName":"Chavez",
            "phone":31998850,
            "password":"test123",
            "identity":15465699
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        });

    test('register new error biker ', async() => {
        await app.post('/api/biker/register')
        .send({
            "email":"test2@test.com",
            "firstName":"Angel",
            "lastName":"Chavez",
            "phone":31998850,
            "password":"test123",
            "identity":15465699
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        });
    });
    
describe('Login biker', () => {
    test('Login biker verified email', async() => {
            await app.get('/api/biker/login')
            .send({
                "email":"test@test.com",
                "password":"test123"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            });

    test('Login biker successful', async() => {
        await app.get('/api/biker/login')
        .send({
            "email":"atest@test.com",
            "password":"test123"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        });
        });
    
