
import mongoose from "mongoose";
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true
    // useUnifiedTopology: true,
    // serverSelectionTimeoutMS: 5000,
    // useFindAndModify: false
  };
  private readonly mongoUri?: string;

  constructor(mongoUri?: string) {
    this.mongoUri = mongoUri;
    log('mongoUri: %o', this.mongoUri);
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

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