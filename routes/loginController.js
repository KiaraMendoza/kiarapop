'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class LoginController {

  /**
   * GET /login
   */
  index(req, res, next) {
    res.locals.error = '';
    res.locals.email = '';
    res.render('login');
  }

  /**
   * POST /login
   */
  async post(req, res, next) {
    try {

      // recoger valores de entrada
      const email = req.body.email;
      const password = req.body.password;

      // buscar el usuario en la BD
      const user = await User.findOne({ email: email });

      // si no existe el usuario o la password no coincide
      // mostrar un error
      if (!user || !(await bcrypt.compare(password, user.password )) ) {
        res.locals.error = res.__('Invalid credentials');
        res.locals.email = email;
        res.render('login');
        return;
      }

      // si el usuario existe y la password es correcta

      // apuntar el _id del usuario en su sessión
      req.session.authUser = {
        _id: user._id,
        // rol: ...
      };

      // redirect to ads page
      res.redirect('/ads');

    } catch (err) {
      next(err);
    }
  }

    /**
   * POST /api/auth
   */
  async auth(req, res, next) {
    try {

      // recoger valores de entrada
      const email = req.body.email;
      const password = req.body.password;

      // buscar el usuario en la BD
      const user = await User.findOne({ email: email });

      // si no existe el usuario o la password no coincide
      // mostrar un error
      if (!user || !(await bcrypt.compare(password, user.password )) ) {
        // responder un error de autenticación en JSON
        const error = new Error('Invalid credentials');
        error.status = 401;
        next(error);
        return;
      }

      // si el usuario existe y la password es correcta

      // crear un JWT
      jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d'}, (err, tokenJWT) => {
        if (err) return next(err);

        // responder
        res.json({ tokenJWT: tokenJWT });
      });


    } catch(err) {
      return next(err);
    }

  }

  /**
   * GET /logout
   */
  logout(req, res, next) {
    req.session.regenerate(err => {
      if (err) {
        next(err);
        return;
      }
      // redirigir a la home
      res.redirect('/');
    })
  }

}

module.exports = new LoginController();
