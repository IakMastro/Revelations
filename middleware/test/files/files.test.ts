import * as supertest from "supertest";
import app            from "../../app";
import * as fs        from "fs";

describe("Files Endpoints", () => {
  let request: supertest.SuperAgentTest;

  beforeEach(() => {
    request = supertest.agent(app);
  });
  afterEach(() => {
    app.close();
  });

  describe("When no files were given", () => {
    it("should return no files were uploaded", async () => {
      const res = await request.post('/files/upload');
      expect(res.status).toBe(400);
      return expect(res.text).toBe("No files were uploaded");
    });
  });

  describe("When no path was given", () => {
    it("should return missing required fields path", async () => {
      let file: Buffer = fs.readFileSync("./test/files/test.txt");
      const res = await request.post('/files/upload')
                               .field('Content-Type', 'multipart/form-data')
                               .attach('uploadedFile', file);
      expect(res.status).toBe(400);
      return expect(res.text).toBe("Missing required fields path");
    });
  });

  describe("When no fileName was given", () => {
    it("should return missing required fields path", async () => {
      let file: Buffer = fs.readFileSync("./test/files/test.txt");
      const res = await request.post('/files/upload')
                               .field('Content-Type', 'multipart/form-data')
                               .field('path', 'test')
                               .attach('uploadedFile', file);
      expect(res.status).toBe(400);
      return expect(res.text).toBe("Missing required fileName field");
    });
  })

  describe("When the required fields aren't missing", () => {
    it ('should upload a file', async () => {
      let file = fs.readFileSync("./test/files/test.txt");
      const res = await request.post('/files/upload')
                               .field('Content-Type', 'multipart/form-data')
                               .field('path', 'test')
                               .field('fileName', 'test.txt')
                               .attach('file', file);
      expect(res.status).toBe(200);
      return expect(res.text).toBe("File uploaded successfully");
    });
  });
});