const express = require("express");
const router = express.Router();
const User = require("./userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




router.post('/signup', async (req, res) => {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password || !phone || !role) {
        return res.status(400).json({ error: 'Please fill in all the required fields' });
    }

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) {
            return res.status(409).json({ error: 'User already exists' });
        } else {
            const hashPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
                name, email, password: hashPassword, phone, role
            });

            const data = await newUser.save();
            console.log(data);
             const token = jwt.sign(
                { userId: data._id, email: data.email },"new token",  { expiresIn: '2d' } 
            );
            res.json({ user: data, token });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select({_id:0}) 
 
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password);

            if (validPassword) {
               console.log(validPassword,"vaild");
                const token = jwt.sign(
                { userId: user._id, email: user.email },"new token",  { expiresIn: '2d' } 
            ); console.log(user, token,"kdid");

                res.status(201).json({ user, token });
            } else {
                return res.status(401).json({ message: 'Password did not match' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
