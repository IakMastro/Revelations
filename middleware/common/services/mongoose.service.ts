// TODO: reformat file
import mongoose from "mongoose";
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

/**
 * @class
 * @classdesc This class is to imported on other class to use a common Mongoose configuration
 * @member count The number of times the connection failed
 * @member mongooseOptions The options that the connection is secured
 * @member mongoUri The URI for the Mongo Server
*/
class MongooseService {
  /**
   * @desc The number of times the connection failed
   * @access private
   */
  private count = 0;
  /**
   * @desc The options that the connection is secured
   * @access private
   */
  private mongooseOptions = {
    useNewUrlParser: true
    // useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 5000,
    // useFindAndModify: false
  };
  /**
   * @desc The URI for the Mongo Server
   * @access private
   */
  private readonly mongoUri?: string;

  /**
   * @constructor
   * @access public
   * @desc Creates a new connection to the Mongo Server.
   * @param {string | undefined} mongoUri The URI for the Mongo Server
   */
  constructor(mongoUri?: string) {
    this.mongoUri = mongoUri;
    log('mongoUri: %o', this.mongoUri);
    this.connectWithRetry();
  }

  /**
   * @access public
   * @returns the instance of the mongoose connection.
   */
  getMongoose() {
    return mongoose;
  }

  /**
   * @method connectWithRetry
   * @access public
   * @desc Starts a new connection to the Mongo Server
   */
  connectWithRetry = () => {
    log('Attempting to connect to MongoDB (will retry if needed)');
    mongoose
      .connect(`mongodb://${this.mongoUri}/revelations?authSource=admin`)
      .then(() => {
        log('Connected to MongoDB');
      })
      .catch((err) => {
        const retrySeconds = 5;
        log(`MongoDB connection unsuccessful (will retry #${++this.count}) after ${retrySeconds} seconds: ${err.message}`);
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  }
}

export default new MongooseService(process.env.MONGO_URI);