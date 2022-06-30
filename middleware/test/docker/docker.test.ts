import app from '../../app';
import supertest from 'supertest';
import { expect }       from 'chai';
import { RunDockerDto } from '../../docker/dto/run.docker.dto';

describe('Docker API', () => {
  let request: supertest.SuperAgentTest;

  before(() => {
    request = supertest.agent(app);
  });
  after((done) => {
    app.close(() => {
      done();
    });
  });

  it('should return a list of containers', async () => {
    const res = await request.get('/docker/list');
    expect(res.status).to.equal(200);
    return expect(res.body).to.be.an('array');
  });

  describe('Build', () => {
    it('should return no files were uploaded', async () => {
      const res = await request.post('/docker/files/upload');
      expect(res.status).to.equal(400);
      return expect(res.text).to.equal('No files were uploaded');
    });

    it('should return a file was uploaded', async () => {
      const res = await request.post('/docker/files/upload')
        .attach('file', './test/docker/test.txt');
      expect(res.status).to.equal(200);
      return expect(res.text).to.equal('File uploaded successfully');
    });
  })

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