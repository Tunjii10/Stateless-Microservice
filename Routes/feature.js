import express from 'express';
import { body, validationResult } from 'express-validator';
import featureController from '../Controllers/featureController.js';
import isLoggedIn from '../Middleware/loginCheck.js';

const router = express.Router();

// patch and thumbnail routes

/**
 * @swagger
 * '/api/v1/features/patch-object':
 *  patch:
 *    summary: Patch a JSON object
 *    description: Apply json patch to a json object, and return the resulting json object
 *    tags:
 *      [features]
 *    security:
 *      [bearerAuth: []]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              jsonObject:
 *                 type: object
 *                 description: Object to be patched
 *                 example: {"Albert":"wear", "man": "self"}
 *              jsonPatchObject:
 *                 type: object
 *                 description: The patch object
 *                 example: {"op": "replace", "path": "/Albert", "value": "Joachjim"}
 *    responses:
 *      200:
 *        description: Patch Successful
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                patchedObject:
 *                  type: object
 *                  description: Patched Object
 *                  example:  {"Albert": "Joachjim","man": "self"}
 */
router.patch(
  '/patch-object',
  isLoggedIn,
  // Validate input fields
  [
    body('jsonObject', 'JSON object must not be empty.').isLength({ min: 1 }),
    body('jsonPatchObject', 'JSON patch object must not be empty.').isLength({
      min: 1,
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
  featureController.json_patch
);

/**
 * @swagger
 * '/api/v1/features/create-thumbnail':
 *  post:
 *    summary: Create thumbnail
 *    description: This request downloads an image (public url) and resizes it to 50x50 pixels thumbnail.
 *    tags:
 *      [features]
 *    security:
 *      [bearerAuth: []]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              url:
 *                 type: string,
 *                 description: public url for image download,
 *                 example: "https://tunjii10.github.io/assets/img/blog.jpg"
 *    responses:
 *      200:
 *        description: Thumbnail generated
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                converted:
 *                  type: boolean
 *                  description: shows if image is converted,
 *                  example: true
 *                success:
 *                  type: string
 *                  description: success message
 *                  example: "Image has been resized"
 *                thumbnail:
 *                  type: string
 *                  description: thumbnail file path
 *                  example: "images/cropped/blog.jpg"
 */
router.post('/create-thumbnail', isLoggedIn, featureController.createThumbNail);

export default router;
