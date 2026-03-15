'use strict';

importScripts('logger.js');
const log = createLogger('Background');

const CAPTURE_STORAGE_KEY = 'testGenerator_capturedRequests';
const CAPTURE_ACTIVE_KEY = 'testGenerator_captureActive';

// In-memory store for current session (popup reads this)
let capturedRequests = [];
let captureActive = false;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_CAPTURED') {
    log.debug('GET_CAPTURED', { count: capturedRequests.length });
    sendResponse({ requests: capturedRequests });
    return true;
  }
  if (message.type === 'ADD_REQUEST') {
    if (captureActive && message.request) {
      capturedRequests.push(message.request);
      chrome.storage.local.set({ [CAPTURE_STORAGE_KEY]: capturedRequests });
      log.request(message.request.method, message.request.url, { total: capturedRequests.length });
    }
    sendResponse({ ok: true });
    return true;
  }
  if (message.type === 'START_CAPTURE') {
    captureActive = true;
    capturedRequests = [];
    chrome.storage.local.set({ [CAPTURE_STORAGE_KEY]: [], [CAPTURE_ACTIVE_KEY]: true });
    log.success('Capture started – recording requests');
    sendResponse({ ok: true });
    return true;
  }
  if (message.type === 'STOP_CAPTURE') {
    captureActive = false;
    chrome.storage.local.set({ [CAPTURE_ACTIVE_KEY]: false });
    log.info('Capture stopped', { recorded: capturedRequests.length });
    sendResponse({ ok: true });
    return true;
  }
  if (message.type === 'CLEAR_CAPTURED') {
    capturedRequests = [];
    chrome.storage.local.set({ [CAPTURE_STORAGE_KEY]: [] });
    log.info('Captured requests cleared');
    sendResponse({ ok: true });
    return true;
  }
  if (message.type === 'IS_CAPTURING') {
    sendResponse({ active: captureActive });
    return true;
  }
  return false;
});

// Restore state on startup
chrome.storage.local.get([CAPTURE_STORAGE_KEY, CAPTURE_ACTIVE_KEY], (data) => {
  if (data[CAPTURE_STORAGE_KEY]) capturedRequests = data[CAPTURE_STORAGE_KEY];
  if (data[CAPTURE_ACTIVE_KEY]) captureActive = data[CAPTURE_ACTIVE_KEY];
  log.info('State restored', { captureActive, requestCount: capturedRequests.length });
});
