/*
 * @Author: Heyong
 * @Date: 2023-10-09 17:37:15
 * @LastEditTime: 2023-10-17 11:14:51
 */
/*
 * @Author: Heyong
 * @Date: 2023-10-09 17:37:15
 * @LastEditTime: 2023-10-16 17:28:19
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1696844194629_7588';

  // add your middleware config here
  config.middleware = [];

  // 修改端口号
  config.cluster = {
    listen: {
      path: '',
      port: 7002,
      hostName: '127.0.0.1'
    }
  }

  config.security = {
    // 关闭 csrf
    csrf: {
      enable: false,
    },
    // 跨域白名单
    domainWhiteList: ["*"]
  }

  // 允许跨域的方法
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  // 渲染成.html文件
  config.view = {
    mapping: { '.html': 'ejs' }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.jwt = {
    secret: 'ggBone-hey' //  加密字符串
  }

  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root123',
      // 数据库名
      database: 'account_book',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  return {
    ...config,
    ...userConfig,
  };
};
