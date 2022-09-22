var port = process.env.PORT || 1234;
module.exports = {
  debug: true,
  marginBottom: 18,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 28,
  javascriptDelay: 1000,
  debugJavascript: true,
  noOutline: true,
  disableSmartShrinking: true,
  'no-debug-javascript': true,
  loadErrorHandling: 'ignore',
  'load-media-error-handling': 'ignore',
  headerSpacing: 5,
  footerSpacing: 5,
  headerHtml: `http://127.0.0.1:${port}/print/header.html`,
  footerHtml: `http://127.0.0.1:${port}/print/footer.html`,
  // spawnOptions:{
  //   stdio: ['inherit', 'inherit', 'inherit']
  // }
}