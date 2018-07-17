document.addEventListener('DOMContentLoaded', function() {

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    var obj = document.getElementById('copied');
    chrome.storage.sync.get({
      customFormat: '[${title}](${url})',
    }, function (options) {
      // Encode (, ), [, ]
      var url = tab.url
        .replace(/\(/g, escape)
        .replace(/\)/g, escape)
        .replace(/\[/g, escape)
        .replace(/\]/g, escape);
      document.getElementById('title').innerHTML = tab.title;
      document.getElementById('url').innerHTML = url;
      obj.value = options.customFormat.replace('${title}', tab.title).replace('${url}', url);
      obj.select();
      document.execCommand('copy');
    });
  });
});
