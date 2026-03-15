'use strict';

(function () {
  if (window.__testGeneratorCaptureInjected) return;
  window.__testGeneratorCaptureInjected = true;

  var prefix = '[TestGenerator:Capture]';
  var stylePrefix = 'color: #7c3aed; font-weight: bold';
  var styleDim = 'color: #64748b; font-size: 11px';
  function ts() {
    return new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  function logIntercept(method, url) {
    console.log('%c' + prefix + '%c ' + ts() + ' intercepted %c' + (method || 'GET') + '%c ' + url, stylePrefix, styleDim, 'font-weight: bold', '');
  }
  console.log('%c' + prefix + '%c ' + ts() + ' %cCapture active – fetch & XHR will be recorded', stylePrefix, styleDim, 'color: #059669; font-weight: bold');

  function safeStringify(obj) {
    try {
      if (typeof obj === 'string') return obj;
      return JSON.stringify(obj);
    } catch (_) {
      return String(obj);
    }
  }

  function emitRequest(data) {
    try {
      document.dispatchEvent(new CustomEvent('testGeneratorRequest', { detail: data }));
    } catch (_) {}
  }

  function captureFetch() {
    const origFetch = window.fetch;
    window.fetch = function (input, init) {
      const url = typeof input === 'string' ? input : (input && input.url) || '';
      const method = (init && init.method) || 'GET';
      const headers = {};
      if (init && init.headers) {
        const h = init.headers;
        if (h instanceof Headers) {
          h.forEach((v, k) => { headers[k] = v; });
        } else if (Array.isArray(h)) {
          h.forEach(([k, v]) => { headers[k] = v; });
        } else {
          Object.assign(headers, h);
        }
      }
      let body = (init && init.body) !== undefined ? init.body : undefined;
      if (body && typeof body !== 'string') {
        try { body = typeof body.toString === 'function' ? body.toString() : safeStringify(body); } catch (_) {}
      }
      var req = { url: url, method: method.toUpperCase(), headers: headers, body: body || null, timestamp: Date.now() };
      logIntercept(req.method, req.url);
      emitRequest(req);
      return origFetch.apply(this, arguments);
    };
  }

  function captureXHR() {
    const OrigXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function () {
      const xhr = new OrigXHR();
      let method = 'GET';
      let url = '';
      let body = null;
      const open = xhr.open;
      xhr.open = function (m, u) {
        method = (m && m.toUpperCase()) || 'GET';
        url = u || '';
        return open.apply(this, arguments);
      };
      const send = xhr.send;
      xhr.send = function (data) {
        body = data != null ? (typeof data === 'string' ? data : safeStringify(data)) : null;
        const headers = {};
        const setRequestHeader = xhr.setRequestHeader;
        xhr.setRequestHeader = function (k, v) {
          headers[k] = v;
          return setRequestHeader.apply(this, arguments);
        };
        send.apply(this, arguments);
        var req = { url: url, method: method, headers: headers, body: body, timestamp: Date.now() };
        logIntercept(req.method, req.url);
        emitRequest(req);
      };
      return xhr;
    };
  }

  captureFetch();
  captureXHR();
})();
