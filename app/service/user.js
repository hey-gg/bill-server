'use strict'

const Service = require('egg').Service;

class UserService extends Service {
    // 获取用户名
    async getUserByName(userName) {
        const { app } = this
        try {
            const result = await app.mysql.get('user', { userName })
            return result;
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    // 注册用户
    async registerUser(params) {
        const { app } = this
        try {
            const result = await app.mysql.insert('user', params)
            return result
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async editUserInfoByName(params) {
        const { app } = this
        try {
            const result = await app.mysql.update('user', params)
            return result
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

module.exports = UserService;