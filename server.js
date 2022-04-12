import express from 'express';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as fs from 'fs';
import 'dotenv/config';
import user from './Routes/user.js';
import features from './Routes/feature.js';

const app = express();
const port = 3000;
// Create a write stream
const accessLogStream = fs.createWriteStream('stateless_microservice.log', {
  flags: 'a',
});
// Api root information for swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Stateless-Microservice',
    version: '1.0.0',
    description:
      'Stateless Microservice with authentication, Json patching and thumbnail generation features',
    contact: {
      name: 'Favour Adetunji',
      email: 'oluwatunji7@gmail.com',
      url: 'https://tunjii10.github.io/',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development Server',
    },
  ],
};
const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: accessLogStream }));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/features', features);
app.use('/api/v1/user', user);

// catch 404 errors
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Page not found' });
});

app.listen(port, () => console.log('server running on port', port));
export default app;
