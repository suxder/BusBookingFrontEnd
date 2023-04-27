// 读取文件的工具方法
const fs = require('fs')
const path = require('path')
const JSON5 = require('json5')
module.exports.getFileJsonData = (filePath) => {
    let json = fs.readFileSync(path.resolve(__dirname,filePath),'utf-8')
    return JSON5.parse(json)
}
