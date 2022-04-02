import jwt from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // return 403 if token not available
    if (!authHeader) {
        return res.status(403).send({ authorized: false, error: 'Token is required' });
    }
    // verify token
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ authorized: false, error: 'Verification Failed' }); 
        }
        req.decoded = decoded;
        return next();
    });
};
export default isLoggedIn;
