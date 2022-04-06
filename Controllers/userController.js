import jwt from 'jsonwebtoken';

const userLoginPost = async (req, res) => {
    // check for missing fields in req.body
    if (!(req.body.username.trim()) || !(req.body.password).trim()) {
        res.status(400).send({ error: 'Please fill all fields' });
    } else {
        const username = req.body.username.toLowerCase();
        // const { password } = req.body.password;
        // create token and set in header
        const accessToken = jwt.sign({ username: username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ accessToken });
    }
};

export default userLoginPost;
