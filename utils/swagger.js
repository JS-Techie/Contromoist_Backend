const swaggerAutogen = require('swagger-autogen')();

const outputFile = '../docs/swagger/swagger.json';
const endpointsFiles = ['../server.js'];

const swaggerOptions = {
    info: {
        title: 'Contromoist API',
        description: 'Contromoist backend services documentation!',
    },
    host: 'localhost:8000',
    schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, swaggerOptions)