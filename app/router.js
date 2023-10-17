/*
 * @Author: Heyong
 * @Date: 2023-10-09 17:37:15
 * @LastEditTime: 2023-10-17 14:01:20
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret)  //  掺入加密字符串
  router.post('/api/user/register', controller.user.register)
  router.post('/api/user/login', controller.user.login)
  router.get('/api/user/testToken', _jwt, controller.user.test)  //  放入第二个参数，作为中间件过滤项
};
