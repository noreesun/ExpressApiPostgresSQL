import express from 'express';
import * as userController from '../controller/userController';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User management
 */

/**
 * @swagger
 * /api/users/register:
 *  post:
 *   summary: Register a new user
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *       schema:
 *          type: object
 *          properties:
 *            username: 
 *             type: string
 *             description: The username of the user
 *             example: JonDoe
 *            password:
 *             type: string
 *             description: The password of the user
 *             example: password
 *            fullname:
 *             type: string
 *             description: The fullname of the user
 *             example: Jon Doe
 *            email:
 *             type: string
 *             description: The email of the user
 *             example: xxx@xxx.com
 *            tel:
 *             type: string
 *             description: The tel of the user
 *             example: 0812345678
 *   responses:
 *    201:
 *     description: User registered successfully
 *    500:
 *     description: User not found
 */


// Register a new user
router.post('/register', userController.registerUser);

/**
 * @swagger
 * /api/users/login:
 *  post:
 *   summary: Login a user
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *       schema:
 *          type: object
 *          properties:
 *            username: 
 *             type: string
 *             description: The username of the user
 *             example: JonDoe
 *            password:
 *             type: string
 *             description: The password of the user
 *             example: password
 *   responses:
 *    200:
 *      description: User logged in successfully
 *      content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged in successfully"
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 accessToken:
 *                   type: string
 *                   description: JWT access token
 *                 refreshToken:
 *                   type: string
 *                   description: JWT refresh token

 *    500:
 *     description: User not found
 */

//User Login
router.post('/login', userController.loginUser);

/**
* @swagger
* /api/users/refresh-token:
*  post:
*    summary: Refresh an access token
*    tags: [Users]
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            properties:
*              refreshToken:
*                 type: string
*                 description: The refresh token
*                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
*    responses:
*      201:
*        description: Access token refreshed successfully
*        content:
*          application/json:
*            schema:
*               type: object
*               properties:
*                 refreshToken:
*                   type: string
*                   description: The refresh token
*                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
*/
router.post('/refresh-token', userController.refreshToken)
 
/**
* @swagger
* /api/users/logoutUser:
*   post:
*     summary: Logout a user
*     tags: [Users]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               refreshToken:
*                 type: string
*                 description: "refreshToken Token for Logout"
*                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
*     responses:
*       200:
*         description: User logged out successfully
*       400:
*         description: Refresh token is required
*/
router.post('/logoutUser', userController.logoutUser)
 
export default router