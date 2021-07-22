import swaggerJsDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  info: {
    title: 'E-Commerce',
    version: '1.0.0',
    description: 'E-COMMERCE is a simple e-commerce application',
  },
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'x-auth-token',
      scheme: 'bearer',
      in: 'header',
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ['*/swagger-doc/*.yaml'],
};

const swaggerSpec = swaggerJsDoc(options);

export default swaggerSpec;
