/*
 * @Author: Heyong
 * @Date: 2023-08-18 17:32:15
 * @LastEditTime: 2023-08-18 17:35:27
 */
module.exports = {
    // 成功提示
    apiSuccess(data = "", msg = 'ok', code = 200) {
        this.body = { msg, data };
        this.status = code;
    },

    // 失败提示
    apiFail(data = "", msg = 'fail', code = 400) {
        this.body = { msg, data };
        this.status = code;
    },
}