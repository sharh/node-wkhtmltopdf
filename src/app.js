/*
 * @Author: 胡明武
 * @Date: 2022-09-20 11:52:30
 * @LastEditors: 胡明武 609557623@qqq.com
 * @LastEditTime: 2022-09-22 11:45:54
 * @FilePath: \node-wkhtmltopdf\src\app.js
 * @Description: 
 */
var http = require('http');
var express = require('express');
var path = require('path');
var fs = require('fs');
var { v4: uuidv4 } = require('uuid');
var bodyParser = require('body-parser');
var wkhtmltopdf = require('./wkhtmltopdf');
// process.platform === 'win32'如果是window下，本地调试可以打开这里，或者下载全局安装加入环境变量
if(process.platform === 'win32'){
  wkhtmltopdf.command = path.resolve(__dirname, './wkhtmltopdf.exe');
}
var queryString = require('query-string');
var pdfOptions = require('./pdfOptions.js');
var app = express();
var port = process.env.PORT || 1234;
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/printpdf', function (req, res) {
  let options = Object.assign({}, req.query, pdfOptions)
  try {
    delete options.input
  } catch (error) {
    // 
  }
  let filepath = path.resolve(__dirname, 'public/pdf/', uuidv4() + '.pdf')
  options.output = filepath
  wkhtmltopdf(req.query.input || `http://127.0.0.1:${port}/print/body.html?${queryString.stringify(req.query)}`, options, (err, pdf)=>{
    let success = fs.existsSync(filepath);
    if(success){
      res.download(filepath)
    }else{
      res.send({
        "data": null,
        "stateCode": "1",
        "stateInfo": "生成PDF失败！"
      })
    }
  })
})
app.post('/printpdf', function (req, res) {
  console.log(req.body, req.query);
  let options = Object.assign({}, req.body.pdfOptions, pdfOptions)
  let filepath = path.resolve(__dirname, 'public/pdf/', uuidv4() + '.pdf')
  options.output = filepath
  wkhtmltopdf(req.body.input || `http://127.0.0.1:${port}/print/body.html?${queryString.stringify(req.body.data)}`, options, (err, pdf)=>{
    // pdf.pipe(res)
    let success = fs.existsSync(filepath);
    if(success){
      res.download(filepath)
      // res.sendFile(filepath)
    }else{
      res.send({
        "data": null,
        "stateCode": "1",
        "stateInfo": "生成PDF失败！"
      })
    }
  })
});
var server = http.createServer(app);

server.listen(port);

console.log('http server listening on port %d', port);
console.log('network is available at http://localhost:%d', port);