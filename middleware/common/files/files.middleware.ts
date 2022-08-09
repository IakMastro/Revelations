import express from "express";

/**
 * @class
 * @classdesc The Middleware class for the Files route
 */
class FilesMiddleware {
  /**
   * @method
   * @access public
   * @desc It checks if the file is send to the server
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateUploadedFile(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded');
    } else {
      next();
    }
  }

  /**
   * @method
   * @access public
   * @desc It checks if the required path is given by the client
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateRequiredPath(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.path) {
      res.status(400).send('Missing required fields path');
    } else {
      next();
    }
  }

  /**
   * @method
   * @access public
   * @desc It checks if the required file name is given by the client
   * @param {express.Request} req
   * @param {express.Response} res
   * @param {express.NextFunction} next
   */
  async validateRequiredFileName(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!req.body.fileName) {
      res.status(400).send('Missing required fileName field');
    } else {
      next();
    }
  }
}

export default new FilesMiddleware();