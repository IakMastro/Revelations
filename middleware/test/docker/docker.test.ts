import app            from '../../app';
import * as supertest from "supertest";

describe('Docker Endpoints', () => {
  let request: supertest.SuperAgentTest;

  beforeEach(() => {
    request = supertest.agent(app);
  });
  afterEach(() => {
    app.close();
  });

  it('should return a list of containers', async () => {
    const res = await request.get('/docker/list');
    expect(res.status).toBe(200);
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