var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../db').import('../models/user');

router.post('/signup', async (req, res) => {
    const user = await User.create({
        full_name: req.body.user.full_name,
        username: req.body.user.username,
        passwordHash: bcrypt.hashSync(req.body.user.password, 10),
        email: req.body.user.email,
    });
    if (user) {
        let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
        res.status(200).json({
            user: user,
            token: token
        })
    } else {
        res.status(500).send(err.message);
    }
})

router.post('/signin', async (req, res) => {
    const user = await User.findOne({ where: { username: req.body.user.username } });
    if (user) {
        bcrypt.compare(req.body.user.password, user.passwordHash, function (err, matches) {
            if (matches) {
                var token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', { expiresIn: 60 * 60 * 24 });
                res.json({
                    user: user,
                    message: "Successfully authenticated.",
                    sessionToken: token
                });
            } else {
                res.status(502).send({ error: "Passwords do not match." })
            }
        });
    } else {
        res.status(403).send({ error: "User not found." })
    }
})

module.exports = router;