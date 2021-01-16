const express = require('express');
const authRoute = require('./auth.route');
const sauceRoute = require('./sauce.route');
const userRoute = require('./user.route');

const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/sauces',
    route: sauceRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
