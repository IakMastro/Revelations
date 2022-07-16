import express from "express";

class FilesMiddleware {
  async validateUploadedFile(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded');
    } else {
      next();
    }
  }

  async validateRequiredPath(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.path) {
      res.status(400).send('Missing required fields path');
    } else {
      next();
    }
  }

  async validateRequiredFileName(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.fileName) {
      res.status(400).send('Missing required fileName field');
    } else {
      next();
    }
  }
}

export default new FilesMiddleware();