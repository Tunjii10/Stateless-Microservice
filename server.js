import express from 'express';
import morgan from 'morgan';
import * as fs from 'fs';
import 'dotenv/config';
import user from './Routes/user.js';
import features from './Routes/feature.js';

const app = express();
const port = 3000;
// Create a write stream
const accessLogStream = fs.createWriteStream('stateless_microservice.log', { flags: 'a' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: accessLogStream }));

 app.use('/api/v1/features', features);
app.use('/api/v1/user', user);

// catch 404 errors
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(port, () => console.log('server running on port', port));
export default app;
