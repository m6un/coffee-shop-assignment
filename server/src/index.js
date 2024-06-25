import './utils/dotenv.js';

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import routes from './routes/index.js';
import { join, resolve } from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

// initialise app using express
const app = express();

// configure cors
const corsOptions = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// configure body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Mongo
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => {
    console.log('MongoDB Connection Failed\n', err);
  });

// use routes
app.use('/api', routes);

// Serve static files from the React app
app.use('/public', express.static(join(__dirname, '../public')));
app.use(express.static(join(__dirname, '../../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../..', 'client', 'dist', 'index.html')); // index is in /server/src so 2 folders up
});

// listen on port
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
