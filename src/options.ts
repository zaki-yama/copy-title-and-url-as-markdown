function saveOptions() {
  var customFormat = (document.getElementById('customFormat') as HTMLTextAreaElement).value;
  chrome.storage.sync.set({
    customFormat: customFormat,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    customFormat: '[${title}](${url})',
  }, function(options) {
    (document.getElementById('customFormat') as HTMLTextAreaElement).value = options.customFormat;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
