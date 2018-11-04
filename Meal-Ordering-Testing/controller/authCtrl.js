const usersModel = require('./../models/user');
const jwt = require('jsonwebtoken');

const authController = {
    login: (req, res, next) => {
        const credential = req.body;
        usersModel.findOne({email: credential.email, password: credential.password}, (err, user) => {
            if (err) res.status(401).json(err);
            if (user !== null) {
                const token = jwt.sign({
                    email: user.email,
                    first_name: user.first_name,
                    isAdmin: user.isAdmin,
                    last_name: user.last_name
                }, 'Waterford');
                res.json({token})
            } else {
                res.status(401).json("email or password incorrect!")
            }
        });
    },

    register: (req, res, next) => {
        let user = new usersModel(req.body);
        user.save(req.body, function (err, user) {
            if (err) return res.status(404).json(err);
            res.json(user)
        })
    },

    authenticate: (req, res, next) => {
      const token = req.headers['authorization'];
      jwt.verify(token, 'Waterford', (err, decode) => {
          if (err) {
              res.json("Token not provided")
          } else {
              next()
          }
      });
  }
};

module.exports = authController;