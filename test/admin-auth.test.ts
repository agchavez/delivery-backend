import supertest from 'supertest';

import Server from '../src/models/server.model';
import {  } from "../src/models/admin.model";


const server = new Server();
const app = supertest(server.app);

describe('Admin auth', () => {
    
})
