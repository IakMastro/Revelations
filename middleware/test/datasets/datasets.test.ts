import app            from '../../app';
import * as supertest from "supertest";
import mongoose       from "mongoose";
import {DatasetDto}   from "../../routes/datasets/dto/dataset.dto";
import exp = require("constants");

describe("Datasets Endpoints", () => {
  let request: supertest.SuperAgentTest;
  let testDatasetDto: DatasetDto = {
    name: 'test',
    description: 'A test database to check if it works',
    data: {
      content: [
        {
          field1: 'test',
          field2: 'test',
          field3: 'test'
        },
        {
          field1: 'hello',
          field2: 'hello',
          field3: 'hello'
        }
      ]
    }
  };
  let id: string;

  beforeAll(() => {
    request = supertest.agent(app);
  });
  afterAll(() => {
    app.close(() => {
      mongoose.connection.close();
    });
  })

  describe("GET /datasets", () => {
    it("should return an empty list", async () => {
      const res = await request.get("/datasets");
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject([]);
    });
  });

  describe("POST /datasets", () => {
    describe("When the name and description aren't missing", () => {
      it('should return name and description are required', async () => {
        const res = await request.post("/datasets");
        expect(res.status).toBe(400);
        return expect(res.text).toBe("Name, path and description are required")
      });
    });

    describe("When all parameters are ready", () => {
      it('should upload the dataset to the database', async () => {
        const res = await request.post("/datasets")
                                 .send({
                                         "name": "test",
                                         "description": "A test database to check if it works",
                                         "path": "test.csv"
                                       });
        expect(res.status).toBe(201);
        expect(res.body).toMatchObject(testDatasetDto);
        id = res.body._id;
      });

      it('should return dataset with this name already exists', async () => {
        const res = await request.post("/datasets")
                                 .send({
                                         "name": "test",
                                         "description": "A test database to check if it works",
                                         "path": "test.csv"
                                       });
        expect(res.status).toBe(400);
        expect(res.text).toBe('Dataset with this name already exists');
      });
    });
  });

  describe("GET /datasets/:name", () => {
    it('should return dataset with this name doesn\'t exists', async () => {
      const res = await request.post("/datasets/abc");
      expect(res.status).toBe(400);
      expect(res.text).toBe('Dataset with this name doesn\'t exist');
    });

    it('should return the dataset and match it with the test dto', async () => {
      const res = await request.post(`/datasets/${testDatasetDto.name}`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(testDatasetDto);
    });
  });

  describe("GET /datasets/:id", () => {
    it('should return dataset with this id doesn\'t exist', async () => {
      const res = await request.get("/datasets/abc");
      expect(res.status).toBe(400);
      expect(res.text).toBe('Dataset with this id doesn\'t exist');
    });

    it('should return the dataset and match it with the test dto', async () => {
      const res = await request.get(`/datasets/${id}`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject(testDatasetDto);
    });
  });
});