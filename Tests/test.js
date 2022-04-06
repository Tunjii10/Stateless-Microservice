import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../server.js';

chai.use(chaiHttp);

describe('Stateless Microservice Test Suite', () => {
    // dummy variables
    const loginDetails = { username: 'ade', password: 'wickham' };
    const imageUrl = 'https://tunjii10.github.io/assets/img/blog.jpg';
    const invalidImageurl = 'https://tunjii10.github.io/assets/img/blog';
    const objectPatch = {
        jsonObject: { Albert: 'wear', man: 'self' },
        jsonPatchObject: { op: 'replace', path: '/Albert', value: 'Joachjim' },
        };
    let token;
    // mock user authentication
    describe('Mock Authentication', () => {
        it('it should not log user if fields empty', (done) => {
            chai.request(app)
            .post('/api/v1/user/login')
            .send({ username: '', password: '' })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
        });
        it('it should accept any username/password and return signed JWT', (done) => {
            chai.request(app)
            .post('/api/v1/user/login')
            .send(loginDetails)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body)
                    .to.have.any.keys('accessToken');
                token = res.body.accessToken;
                done();
            });
        });
    });
    describe('Thumbnail Creation', () => {
        it('it should not create thumbnail if there is no url', (done) => {
            chai.request(app)
            .post('/api/v1/features/create-thumbnail')
            .set('authorization', token)
            .send({ url: '' })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
        });
        it('it should not process image if jwt token invalid', (done) => {
            chai.request(app)
            .post('/api/v1/features/create-thumbnail')
            .set('authorization', 'wrongtoken')
            .send({ url: imageUrl })
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body.authorized).to.equal(false);
                done();
            });
        });
        it('it should not create thumbnail if image extension in url is invalid', (done) => {
            chai.request(app)
            .post('/api/v1/features/create-thumbnail')
            .set('authorization', token)
            .send({ url: invalidImageurl })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
        });
        it('it should accept a public url and return resized image', (done) => {
            chai.request(app)
            .post('/api/v1/features/create-thumbnail')
            .set('authorization', token)
            .send({ url: imageUrl })
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.converted).to.equal(true);
                done();
            });
        });
    });
    describe('Object Patch', () => {
        it('it should not create patch if there is no patch object', (done) => {
            chai.request(app)
            .patch('/api/v1/features/patch-object')
            .set('authorization', token)
            .send({})
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
        });
        it('it should not create patch if there is missing values in patch object', (done) => {
            chai.request(app)
            .patch('/api/v1/features/patch-object')
            .set('authorization', token)
            .send({
                jsonPatchObject: { op: 'replace', path: '/Albert', value: 'Joachjim' },
                })
            .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
            });
        });
        it('it should not process patch if jwt token invalid', (done) => {
            chai.request(app)
            .patch('/api/v1/features/patch-object')
            .set('authorization', 'wrongtoken')
            .send(objectPatch)
            .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                done();
            });
        });
        it('it should patch jsonobject and jsonpatchobject', (done) => {
            chai.request(app)
            .patch('/api/v1/features/patch-object')
            .set('authorization', token)
            .send(objectPatch)
            .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                done();
            });
        });
    });
    describe('Authentication', () => {
        it('it should not process request if there are no auth headers', (done) => {
            chai.request(app)
            .patch('/api/v1/features/patch-object')
            .send(objectPatch)
            .end((err, res) => {
                expect(res.statusCode).to.equal(403);
                done();
            });
        });
    });
    describe('Invalid urls/routes', () => {
        it('it should not process invalid url', (done) => {
            chai.request(app)
            .patch('/api/v1/patch-object')
            .send(objectPatch)
            .end((err, res) => {
                expect(res.statusCode).to.equal(404);
                done();
            });
        });
    });
});
