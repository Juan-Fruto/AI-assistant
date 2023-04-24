import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dontenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { Configuration, OpenAIApi } from 'openai';
import routes from'./routes/index.routes.js';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import openaiRoutes from './routes/openai.routes.js';
import knowledgeRoutes from './routes/knowledge.routes.js';
import fileUpload from 'express-fileupload';

const app = express();

// settings

dontenv.config();
app.set('PORT', process.env.PORT || 4000);

const configuration = new Configuration({
    apiKey: process.env.OPENAI_APIKEY,
});
export const openai = new OpenAIApi(configuration);

// middlewares

app.use(express.json());
/*set of security solutions by http comuniaction*/
app.use(helmet());
/*reducer the risk of phishing attacks*/
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 1 * 1080 * 1080 },
    useTempFiles : true,
    tempFileDir : './uploads'
}));

// routes

app.use('/api', routes);

// running

app.use(function(req, res) {
    res.status(404).json({message: "404 not found"});
});

export default app;