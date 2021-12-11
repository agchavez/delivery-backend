import supertest from 'supertest';


import adminModel from '../src/models/admin.model';
import Server from '../src/models/server.model';


const server = new Server();
const app = supertest(server.app);
describe('Register Admin', () => {
    test('register new successful admin ', async() => {
        await adminModel.deleteOne({"email":"test2@test.com"})
        await app.post('/api/admin/register')
        .send({
            "email":"test2@test.com",
            "firstName":"Daniela",
            "lastName":"Zavala",
            "phone":95169263,
            "password":"test123"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        });

    test('register new error admin ', async() => {
        await app.post('/api/admin/register')
        .send({
            "email":"test2@test.com",
            "firstName":"Daniela",
            "lastName":"Zavala",
            "phone":95169263,
            "password":"test123"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        });
    });
    
describe('Login admin', () => {
    test('Login admin', async() => {
            await app.post('/api/admin/login')
            .send({
                "email":"test@test.com",
                "password":"test123"
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            });

    test('Login admin successful', async() => {
        await app.post('/api/admin/login')
        .send({
            "email":"test@test.com",
            "password":"test123"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        });
});
