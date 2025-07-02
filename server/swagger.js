import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WealthWise API',
      version: '1.0.0',
      description: 'API for WealthWise - Daily AI Money Mentor',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./routes/*.js'], // path to your route files
};

const specs = swaggerJsDoc(options);

export { swaggerUi, specs };
