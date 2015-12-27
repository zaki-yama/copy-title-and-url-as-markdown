document.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.getSelected(null, function(tab) {
    document.getElementById('title').innerHTML = tab.title;
    document.getElementById('url').innerHTML = tab.url;
    var obj = document.getElementById('copied');
    obj.value = '[' + tab.title + '](' + tab.url + ')';
    obj.select();
    document.execCommand('copy');
  });
});
