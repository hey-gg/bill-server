/*
 * @Author: Heyong
 * @Date: 2023-10-17 09:22:08
 * @LastEditTime: 2023-10-17 17:31:11
 */
const controller = require('egg').Controller;
const moment = require('moment');

class UserController extends controller {
    async register() {
        const { ctx } = this;
        const { userName, password } = ctx.request.body;
        //  验证用户名或密码不能为空
        if (!userName || !password) {
            ctx.body = {
                code: 500,
                msg: '用户名或密码不能为空'
            }
            return
        }

        // 验证数据库内是否已有该用户名
        const userInfo = await ctx.service.user.getUserByName(userName)
        if (userInfo && userInfo.id) {
            ctx.body = {
                code: 500,
                msg: '该用户名已存在, 请重新输入'
            }
            return
        }

        // 将用户名写入数据库
        const defaultAvatar = 'https://p26-passport.byteacctimg.com/img/user-avatar/d40255e598fc607e84c9e772406a7990~120x120.awebp';
        const result = await ctx.service.user.registerUser({
            userName,
            password,
            signature: '世界和平',
            avatar: defaultAvatar,
            createTime: moment().format('YYYY-MM-DD hh:mm:ss')
        })
        if (result) {
            ctx.body = {
                code: 200,
                msg: '注册成功',
                data: null
            }
        } else {
            ctx.body = {
                code: 500,
                msg: '注册失败',
                data: null
            }
        }
    }

    async login() {
        const { ctx, app } = this;
        const { userName, password } = ctx.request.body;
        if (!userName || !password) {
            ctx.body = {
                code: 500,
                msg: '用户名或密码不能为空'
            }
        }
        const userInfo = await ctx.service.user.getUserByName(userName)
        if (!userInfo || !userInfo.id) {
            ctx.body = {
                code: 500,
                msg: '当前用户不存在'
            }
            return
        }

        if (userInfo && userInfo.password !== password) {
            ctx.body = {
                code: 500,
                msg: '密码错误'
            }
        }

        // 生成token
        const token = app.jwt.sign({
            id: userInfo.id,
            userName: userInfo.userName,
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60)
        }, app.config.jwt.secret)
        ctx.body = {
            code: 200,
            msg: '登录成功',
            data: {
                token
            }
        }
    }
    async test() {
        const { ctx, app } = this
        const token = ctx.request.header.authorization
        if (!token) {
            ctx.body = {
                code: 500,
                msg: 'token不能为空'
            }
            return
        }
        const userInfo = app.jwt.verify(token, app.config.jwt.secret)
        ctx.body = {
            code: 200,
            message: 'token验证成功',
            data: userInfo
        }
    }

    async getUserInfo() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization
        const decode = await app.jwt.verify(token, app.config.jwt.secret);
        const userInfo = await ctx.service.user.getUserByName(decode.userName)
        ctx.body = {
            code: 200,
            msg: '获取用户信息成功',
            data: userInfo
        }
    }

    async editUserInfo() {
        const { ctx, app } = this
        try {
            const token = ctx.request.header.authorization
            const decode = await app.jwt.verify(token, app.config.jwt.secret);
            if (!decode) return
            const userInfo = await ctx.service.user.getUserByName(decode.userName)
            const result = await ctx.service.user.editUserInfoByName({
                ...userInfo,
                ...ctx.request.body
            })
            ctx.body = {
                code: 200,
                msg: '修改用户信息成功',
                data: null
            }
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = UserController;