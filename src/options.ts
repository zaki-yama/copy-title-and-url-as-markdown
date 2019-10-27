function saveOptions() {
  const customFormat = (document.getElementById('customFormat') as HTMLTextAreaElement).value;
  chrome.storage.sync.set({
    customFormat: customFormat,
  }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 1000);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    customFormat: '[${title}](${url})',
  }, (options) => {
    (document.getElementById('customFormat') as HTMLTextAreaElement).value = options.customFormat;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
