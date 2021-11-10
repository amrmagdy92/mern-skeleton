import mongoose from 'mongoose';
import config from '../../config/config';

function dbConnect() {
    mongoose.Promise = global.Promise;
        mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        mongoose.connection.on('error', (err) => {
            throw new Error(`Unable to connect to mongoose database at ${config.mongoUri}.\nThe error is: ${err}`);
        });
}

export default dbConnect;