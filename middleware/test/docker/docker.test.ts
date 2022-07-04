import app            from '../../app';
import * as supertest from "supertest";
import {expect}       from 'chai';
import {Done}         from "mocha";

describe('Docker Endpoints', () => {
  let request: supertest.SuperAgentTest;

  before(() => {
    request = supertest.agent(app);
  });
  after((done: Done) => {
    app.close(() => {
      done();
    });
  });

  it('should return a list of containers', async () => {
    const res = await request.get('/docker/list');
    expect(res.status).to.equal(200);
    return expect(res.body).to.be.an('array');
  });

  // describe('Run', () => {
  //   it('should return missing required fields name and tag', async () => {
  //     let res = await request.post('/docker/run')
  //       .send({
  //         name: '',
  //         tag: ''
  //       });
  //     expect(res.status).to.equal(400);
  //     return expect(res.text).to.equal('Missing required fields name and tag');
  //   });

  //   it('should start a container', async () => {
  //     let query: RunDockerDto = {
  //       name: 'test',
  //       tag: 'latest'
  //     }
  //     let res = await request.post('/docker/run').send(query);
  //     return expect(res.status).to.equal(200);
  //   });
  // });
})