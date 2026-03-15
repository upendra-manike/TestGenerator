'use strict';

var _tgGlobal = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : this;

/**
 * Simple logger for TestGenerator extension.
 * Usage: const log = createLogger('Background');
 *        log.info('Message');
 *        log.request('GET', 'https://api.example.com');
 */
function createLogger(component) {
  const prefix = `[TestGenerator:${component}]`;
  const stylePrefix = 'color: #2563eb; font-weight: bold';
  const styleDim = 'color: #64748b; font-size: 11px';
  const styleSuccess = 'color: #059669';
  const styleWarn = 'color: #d97706';
  const styleError = 'color: #dc2626';

  function ts() {
    return new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  return {
    info(msg, data) {
      console.log(`%c${prefix}%c ${ts()} %c${msg}`, stylePrefix, styleDim, '', data !== undefined ? data : '');
    },
    success(msg, data) {
      console.log(`%c${prefix}%c ${ts()} %c${msg}`, stylePrefix, styleDim, styleSuccess, data !== undefined ? data : '');
    },
    warn(msg, data) {
      console.warn(`%c${prefix}%c ${ts()} %c${msg}`, stylePrefix, styleDim, styleWarn, data !== undefined ? data : '');
    },
    error(msg, err) {
      console.error(`%c${prefix}%c ${ts()} %c${msg}`, stylePrefix, styleDim, styleError, err !== undefined ? err : '');
    },
    request(method, url, extra) {
      const m = (method || 'GET').toUpperCase();
      console.log(
        `%c${prefix}%c ${ts()} %c${m}%c %c${url}`,
        stylePrefix,
        styleDim,
        'font-weight: bold; color: #059669',
        '',
        'color: #475569',
        extra !== undefined ? extra : ''
      );
    },
    debug(msg, data) {
      console.log(`%c${prefix}%c [debug] ${msg}`, stylePrefix, styleDim, data !== undefined ? data : '');
    },
  };
}

_tgGlobal.createLogger = createLogger;
