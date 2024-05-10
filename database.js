import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

const db = mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

export default db;
