# Fork from [wkhtmltopdf](https://github.com/devongovett/node-wkhtmltopdf.git)

# Useage

```javascript
var axios = require('axios');

axios.post('http://127.0.0.1:1234/printpdf', {
    // input: "https://www.qq.com",
    data: {
        // 如果未指定input，则使用src/public/print/body.html作为入口，data的内容将以url参数的形式传入queryString.stringify处理后：[key]=value
    },
    // 脚本执行的选项，参考https://github.com/devongovett/node-wkhtmltopdf.git及http://wkhtmltopdf.org/docs.html
    pdfOptions: {
        debug: true,
        marginBottom: 18,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 28,
        javascriptDelay: 1000,
        debugJavascript: true,
        noOutline: true,
        disableSmartShrinking: true,
        // "load-error-handling": "ignore",暂时不支持，传入后会报错，虽然文档有这个选项
        // "load-media-error-handling": "ignore",暂时不支持，传入后会报错，虽然文档有这个选项
        headerSpacing: 5,
        footerSpacing: 5,
        headerHtml: "http://127.0.0.1:1234/print/print-top.html",
        footerHtml: "http://127.0.0.1:1234/print/print-bottom.html",
    }
}).then((res)=>{
  // 默认使用的是下载pdf文件，如果生成失败，数据格式为:
  {
    "data": null,
    "stateCode": "1",
    "stateInfo": "生成PDF失败！"
  }
})
```

## Installation

项目自带了Ubuntu安装包，主要用于docker部署的时候直接安装

其他版本下载：[下载地址](http://wkhtmltopdf.org/downloads.html#stable)