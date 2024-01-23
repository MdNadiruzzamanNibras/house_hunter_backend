const express = require("express");
const router = express.Router();
const User = require("./userSchema");
const bcrypt = require("bcrypt");

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

            res.status(201).json(data);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
