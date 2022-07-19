import app            from '../../app';
import * as supertest from "supertest";
import {RunDockerDto} from "../../routes/docker/dto/run.docker.dto";

describe('Docker Endpoints', () => {
  let request: supertest.SuperAgentTest;
  let id: string;

  beforeEach(() => {
    request = supertest.agent(app);
  });
  afterEach(() => {
    app.close();
  });

  it('GET /docker/list should return a list of containers', async () => {
    const res = await request.get('/docker/list');
    expect(res.status).toBe(200);
  });

  describe("POST /docker/build", () => {
    it('should return required build fields', async () => {
      const res = await request.post("/docker/build");
      expect(res.status).toBe(400);
      expect(res.text).toBe("Missing required fields name and path");
    });

    it('should build the container', async () => {
      const res = await request.post("/docker/build")
                               .send({
                                       name: "test",
                                       path: "routes/temp"
                                     });
      expect(res.status).toBe(200);
      expect(res.text).toBe("Container was built successfully");
    });
  });

  describe('POST /docker/run', () => {
    it('should return missing required fields name and tag', async () => {
      let res = await request.post('/docker/run');
      expect(res.status).toBe(400);
      expect(res.text).toBe('Missing required fields name and tag');
    });

    it('should start a container', async () => {
      let res = await request.post('/docker/run').send({
                                                         name: 'test',
                                                         tag: 'test'
                                                       });
      expect(res.status).toBe(200);
      id = res.text;
    });
  });

  describe("POST /docker/stop", () => {
    jest.setTimeout(200000);
    it('should return missing required field id', async () => {
      let res = await request.post('/docker/stop');
      expect(res.status).toBe(400);
      expect(res.text).toBe("Missing required fields id");
    });

    it('should stop the container', async () => {
      let res = await request.post("/docker/stop")
                             .send({id: id});
      expect(res.status).toBe(200);
      expect(res.text).toBe("Container stopped")
    });
  });
});