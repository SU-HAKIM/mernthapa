const router = require('express').Router();
const bcrypt = require('bcrypt');

require('../db/conn');
const User = require('../models/userSchema');

router.get('/', (req, res) => {
    res.send('hello from home')
})

router.post('/register', async (req, res) => {
    let { name, email, phone, work, password, cPassword } = req.body
    try {
        if (!name || !email || !phone || !work || !password || !cPassword) {
            return res.status(422).json({ error: 'please fill all of the fields' })
        }



        const exist = await User.findOne({ email: email })
        if (exist) {
            return res.status(422).json({ error: 'user already exist.' })
        }

        if (password === cPassword) {
            let newPassword = await bcrypt.hash(password, 10)

            const user = new User({ name, email, phone, work, password: newPassword });

            const result = await user.save();

            res.status(200).json(result)
        } else {
            return res.status(500).json({ error: 'password must match' })
        }


    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router