const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        version: '',      // by default: '1.0.0'
        title: '',        // by default: 'REST API'
        description: '',  // by default: ''
    },

    host: '',      // by default: 'localhost:3000'
    basePath: '',  // by default: '/'
    schemes: [],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    tags: [        // by default: empty Array
        {
            name: '',         // Tag name
            description: '',  // Tag description
        },
        // { ... }
    ],
    
    
    security: {
        FirebaseAuthentication: []
    },
    // by default: empty object
    definitions: {},          // by default: empty object (Swagger 2.0)
    components: {
        "securitySchemes": {
            // "firebase": {
            //     "authorizationUrl": "https://accounts.google.com/o/oauth2/auth",
            //     "flow": "implicit",
            //     "type": "oauth2",
            //     "x-google-issuer": "https://securetoken.google.com/travelproject22-6b9d4",
            //     "x-google-jwks_uri": "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system.gserviceaccount.com",
            //     "x-google-audiences": "travelproject22-6b9d4",
            //     "scopes": {
            //         "https://www.googleapis.com/auth/firebase": "Firebase scope"
            //     }
            // }
            FirebaseAuthentication:{
                scheme: "bearer",
      
                type: http
            }

            
        }
      
        ,
    }            // by default: empty object (OpenAPI 3.x)
};

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/controller/*.js',];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);