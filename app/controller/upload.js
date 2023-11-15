/*
 * @Author: Heyong
 * @Date: 2023-10-17 17:35:02
 * @LastEditTime: 2023-10-18 16:20:11
 */
'use strict'

const fs = require('fs')
const moment = require('moment')
const mkdirp = require('mkdirp')
const path = require('path')
const Controller = require('egg').Controller

class UploadController extends Controller {
    async upload() {
        const { ctx } = this
        const file = ctx.request.files[0]
        let uploadDir = ''
        try {
            let f = fs.readFileSync(file.filepath)
            let day = moment().format('YYYYMMDD')
            let dir = path.join(this.config.uploadDir, day)
            await mkdirp(dir)
            let date = Date.now()
            uploadDir = path.join(dir, date + path.extname(file.filename))
            uploadDir = uploadDir.replace(/\\/g, '/')
            fs.writeFileSync(uploadDir, f)
        } catch (error) {
            console.log(error);
        } finally {
            ctx.cleanupRequestFiles()
        }
        ctx.body = {
            code: 200,
            msg: '上传成功',
            data: uploadDir.replace(/app/g, '')
        }
    }
}

module.exports = UploadController