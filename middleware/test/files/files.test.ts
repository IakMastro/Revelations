import * as supertest from "supertest";
import app            from "../../app";
import {Done}         from "mocha";
import {expect}       from "chai";
import * as fs        from "fs";
import {UploadedFile} from "express-fileupload";

describe("Files Endpoints", () => {
  let request: supertest.SuperAgentTest;

  before(() => {
    request = supertest.agent(app);
  });
  after((done: Done) => {
    app.close(() => {
      done();
    });
  });

  describe("When no files were given", () => {
    it("should return no files were uploaded", async () => {
      const res = await request.post('/files/upload');
      expect(res.status).to.equal(400);
      return expect(res.text).to.equal("No files were uploaded");
    });
  });

  describe("When no path was given", () => {
    it("should return missing required fields path", async () => {
      let file: Buffer = fs.readFileSync("./test/files/test.txt");
      const res = await request.post('/files/upload')
                               .field('Content-Type', 'multipart/form-data')
                               .attach('uploadedFile', file);
      expect(res.status).to.equal(400);
      return expect(res.text).to.equal("Missing required fields path");
    });
  });

  describe("When the required fields aren't missing", () => {
    it ('should upload a file', async () => {
      let file = fs.readFileSync("./test/files/test.txt");
      const res = await request.post('/files/upload')
                               .field('Content-Type', 'multipart/form-data')
                               .field('path', 'test/test.txt')
                               .attach('uploadedFile', file);
      expect(res.status).to.equal(200);
      return expect(res.text).to.equal("File uploaded successfully");
    })
  })
});