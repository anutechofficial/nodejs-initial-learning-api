// swagger.ts

import swaggerAutogen from 'swagger-autogen';

const options = {
  swaggerDefinition: {
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
    },
  }
  // host: 'localhost:3000',
  //apis: ['/app.ts'], // Specify the files where your API routes are defined
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.ts']
// const swaggerSpec = swaggerJsdoc(options);
''
export default swaggerAutogen(outputFile, endpointsFiles, options);

