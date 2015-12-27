document.addEventListener('DOMContentLoaded', function() {

  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0];
    document.getElementById('title').innerHTML = tab.title;
    document.getElementById('url').innerHTML = tab.url;
    var obj = document.getElementById('copied');
    obj.value = '[' + tab.title + '](' + tab.url + ')';
    obj.select();
    document.execCommand('copy');
  });
});
