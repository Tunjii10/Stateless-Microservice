import jwt from 'jsonwebtoken';

const userLoginPost = (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).send({ error: 'Please fill all fields' });
    } else {
        const username = req.body.username.toLowerCase();
        const {password} = req.body.password;

        const token = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        req.headers['token'] = token;
        res.status(200).send({ user: username, authorized: true, token: token });
    }
};

export default userLoginPost;
