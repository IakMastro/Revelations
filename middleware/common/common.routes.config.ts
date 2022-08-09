import express from "express";

/**
 * @class
 * @abstract
 * @classdesc This class is used to configure routers and it's the common module that is inherited
 * @member app The app instance of the API
 * @member name The name of the router
 */
export abstract class CommonRoutesConfig {
  /**
   * @desc The app instance of the API
   * @access public
  **/
  app: express.Application;
  /**
   * @desc The name of the router
   * @access public
  **/
  name: string;

  /**
   * @constructor
   * @access public
   * @desc Creates a route based on the configuration
   * @param {express.Application} app The app instance of the API
   * @param {string} name The name of the router
   */
  constructor(app: express.Application, name: string) {
    this.app = app;
    this.name = name;
    this.configureRoutes();
  }

  /**
   * @desc Returns the name of the router
   * @returns name
   * @example
   *
   * name = "example name"
   * => example name
   */
  getName() {
    return this.name;
  }

  /**
   * @method configureRoutes
   * @access public
   * @desc Configures the routes of this router
   * @abstract
   */
  abstract configureRoutes(): express.Application;
}