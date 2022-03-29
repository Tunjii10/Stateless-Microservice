import jwt from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {
    const token = req.headers;
    if (!token) {
        return res.status(403).send({ authorized: false, error: 'Token is required' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ authorized: false, error: 'Verification Failed' }); 
        }
        req.decoded = decoded;
        return next();
    });
};
export default isLoggedIn;
