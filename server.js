import express from 'express';
const app = express();
import http from "http";
import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import cookieParser from 'cookie-parser';
// hello
// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';
import motorRoutes from './routes/motorRoutes.js'

// middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';
import health_data from "./routes/healthRoutes.js"
import cors from "cors";

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const server = http.createServer(app);

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, './client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
app.use(cookieParser());
// app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
app.use('/api/v1/motor', motorRoutes);

//////////////////////////////////////
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self' http://qts.iitkgp.ac.in/last/gail/current/2000; other-directives..."
  );
  next();
});
app.use(cookieParser());
app.use((req, res, next) => {
  res.cookie('_cfuvid', 'cookie-value', { domain: 'https://gail-iitkgp-1.onrender.com/healthCard/123' });
  next();
});



app.use('api/v1/healthdata',health_data)



//////////////////////////
// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    server.listen(port, () => {
    
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
