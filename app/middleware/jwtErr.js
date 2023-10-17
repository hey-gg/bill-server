/*
 * @Author: Heyong
 * @Date: 2023-10-17 13:42:46
 * @LastEditTime: 2023-10-17 16:44:39
 */
'use strict'

module.exports = (secret) => {
    return async function jwtErr(ctx, next) {
        const token = ctx.request.header.authorization;
        let decode
        if (token != null && token) {
            try {
                decode = await ctx.app.jwt.verify(token, secret);
                await next();
            } catch (error) {
                console.log(error);
                ctx.status = 200;
                ctx.body = {
                    msg: 'token 已过期，请重新登录',
                    code: 401
                }
                return;
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                msg: 'token 验证不存在',
                code: 401
            }
        }
    }
}