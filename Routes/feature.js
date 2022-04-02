import express from 'express';
import { body, validationResult } from 'express-validator';
import featureController from '../Controllers/featureController.js';
import isLoggedIn from '../Middleware/loginCheck.js';

const router = express.Router();

// patch and thumbnail routes
router.patch(
    '/patch-object',
    isLoggedIn,
    // Validate input fields
    [body('jsonObject', 'JSON object must not be empty.').isLength({ min: 1 }),
    body('jsonPatchObject', 'JSON patch object must not be empty.').isLength({ min: 1 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
    }],
    featureController.json_patch,
    );

router.post('/create-thumbnail', isLoggedIn, featureController.createThumbNail);

export default router;
