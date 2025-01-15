import { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import dotenv from 'dotenv'
 
dotenv.config()
 
const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'ExpressJS with PostgreSQL API',
            version: '1.0.0',
            description: 'API Documentation for ExpressJS with PostgreSQL',
        },
        servers: [
            {
                //url: `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`,
                url: `https://${process.env.HOST}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Product: {
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                            description: 'Product ID',
                        },
                        name: {
                            type: 'string',
                            description: 'Product Name',
                        },
                        price: {
                            type: 'number',
                            format: 'double',
                            description: 'Product Price',
                        },
                    }
                },
                User: {
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                            description: 'User ID',
                            example: 1,
                        },
                        username: {
                            type: 'string',
                            description: 'User Username',
                            example: 'xxxx',
                        },
                        fullname: {
                            type: 'string',
                            description: 'User Fullname',
                            example: 'xxxx',
                        },                      
                        email: {
                            type: 'string',
                            description: 'User Email',
                            example: 'xxxx@auct.cpom',
                        },
                        password: {
                            type: 'string',
                            description: 'User Password',
                        }
                    }
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: [
        './src/routes/*.ts',
        './dist/routes/*.js',
        './src/**/*.ts',
    ],
}
 
const swaggerSpec = swaggerJSDoc(options)
 
const setupSwagger = (app: Express): void => {
    app.use('/api-docs', (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();    
    })
 
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerSpec, {
          customSiteTitle: 'ExpressJS with PostgreSQL API',
          explorer: true,
          swaggerOptions: {
            docExpansion: 'none',
            filter: true,
            showRequestHeaders: true,
          },
        })
    )
}
 
export default setupSwagger