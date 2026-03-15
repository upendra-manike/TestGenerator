'use strict';

(function () {
  var prefix = '[TestGenerator:Content]';
  var stylePrefix = 'color: #2563eb; font-weight: bold';
  var styleDim = 'color: #64748b; font-size: 11px';
  function ts() {
    return new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  function logRequest(method, url) {
    console.log('%c' + prefix + '%c ' + ts() + ' %c' + (method || 'GET') + '%c %c' + url, stylePrefix, styleDim, 'font-weight: bold; color: #059669', '', 'color: #475569');
  }

  document.addEventListener('testGeneratorRequest', function (e) {
    if (e.detail && chrome.runtime && chrome.runtime.sendMessage) {
      logRequest(e.detail.method, e.detail.url);
      chrome.runtime.sendMessage({ type: 'ADD_REQUEST', request: e.detail }).catch(function () {});
    }
  });
})();
