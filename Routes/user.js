import express from 'express';
import userLoginPost from '../Controllers/userController.js';

const router = express.Router();

// login route
/**
 * @swagger
 * '/api/v1/user/login':
 *  post:
 *    summary: Authentication
 *    description: This is a mock authentication and therefore accepts any username and password pair.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                 type: string
 *                 description: users name
 *                 example: "Martin"
 *              password:
 *                 type: string
 *                 description: users password
 *                 example: "bady1"
 *    responses:
 *      200:
 *        description: Access granted
 *        content:
 *          application/json:
 *          schema:
 *            type: object
 *            properties:
 *              accessToken:
 *                 type: string
 *                 description: JWT token
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lZyIsImlhdCI6MTY0ODk5NzkzOSwiZXhwIjoxNjQ5MDAxNTM5fQ.0ygS0DaIXwhx4Q_aEqTUORLsWTkRn0n_fsOfkYbM-3Q"
 */
router.post('/login', userLoginPost);

export default router;
