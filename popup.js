'use strict';

const log = typeof createLogger !== 'undefined' ? createLogger('Popup') : {
  info: () => {}, success: () => {}, warn: () => {}, error: (m, e) => console.error(m, e), request: () => {}, debug: () => {}
};

const btnStart = document.getElementById('btnStart');
const btnStop = document.getElementById('btnStop');
const btnClear = document.getElementById('btnClear');
const requestList = document.getElementById('requestList');
const emptyState = document.getElementById('emptyState');
const exportResult = document.getElementById('exportResult');
const formatBtns = document.querySelectorAll('.format-btn');

function setCapturing(active) {
  btnStart.disabled = active;
  btnStop.disabled = !active;
}

function renderRequests(requests) {
  requestList.innerHTML = '';
  requests.forEach((r) => {
    const li = document.createElement('li');
    const method = document.createElement('span');
    method.className = `method ${(r.method || 'GET').toLowerCase()}`;
    method.textContent = (r.method || 'GET').toUpperCase();
    const url = document.createElement('span');
    url.className = 'url';
    url.title = r.url || '';
    url.textContent = r.url || '(no URL)';
    li.appendChild(method);
    li.appendChild(url);
    requestList.appendChild(li);
  });
}

function loadState() {
  chrome.runtime.sendMessage({ type: 'IS_CAPTURING' }, (res) => {
    if (res && res.active) setCapturing(true);
  });
  chrome.runtime.sendMessage({ type: 'GET_CAPTURED' }, (res) => {
    const requests = (res && res.requests) || [];
    log.debug('Loaded state', { requestCount: requests.length });
    renderRequests(requests);
  });
}

function showExportResult(message, isError) {
  exportResult.textContent = message;
  exportResult.classList.remove('hidden', 'error');
  if (isError) exportResult.classList.add('error');
  exportResult.classList.remove('hidden');
}

btnStart.addEventListener('click', async () => {
  log.info('Start capture clicked');
  chrome.runtime.sendMessage({ type: 'START_CAPTURE' }, async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.id) {
      log.warn('No active tab');
      showExportResult('No active tab.', true);
      return;
    }
    try {
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ['content.js'] });
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, world: 'MAIN', files: ['capture.js'] });
      setCapturing(true);
      renderRequests([]);
      log.success('Capture started', { tabId: tab.id, url: tab.url });
      showExportResult('Capture started. Use the site, then click Stop.');
    } catch (e) {
      log.error('Inject failed', e);
      showExportResult('Cannot inject on this tab (e.g. chrome://).', true);
    }
  });
});

btnStop.addEventListener('click', () => {
  log.info('Stop capture clicked');
  chrome.runtime.sendMessage({ type: 'STOP_CAPTURE' }, () => {
    setCapturing(false);
    loadState();
    log.success('Capture stopped – generate tests below');
    showExportResult('Capture stopped. Generate tests below.');
  });
});

btnClear.addEventListener('click', () => {
  log.info('Clear captured clicked');
  chrome.runtime.sendMessage({ type: 'CLEAR_CAPTURED' }, () => {
    renderRequests([]);
    exportResult.classList.add('hidden');
    log.success('Requests cleared');
  });
});

function getRequests() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ type: 'GET_CAPTURED' }, (res) => {
      resolve((res && res.requests) || []);
    });
  });
}

formatBtns.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const format = btn.getAttribute('data-format');
    log.info('Generate clicked', { format });
    const requests = await getRequests();
    if (!requests.length) {
      log.warn('Generate with no requests');
      showExportResult('No requests captured. Start capture and perform actions first.', true);
      return;
    }
    let code = '';
    let filename = '';
    try {
      if (format === 'playwright') {
        code = window.TestGeneratorPlaywright(requests);
        filename = 'api-tests.spec.js';
      } else if (format === 'cypress') {
        code = window.TestGeneratorCypress(requests);
        filename = 'api-tests.cy.js';
      } else if (format === 'postman') {
        code = window.TestGeneratorPostman(requests);
        filename = 'collection.json';
      } else if (format === 'rest-assured') {
        code = window.TestGeneratorRestAssured(requests);
        filename = 'ApiTests.java';
      }
      if (!code) {
        log.error('Generator returned nothing');
        showExportResult('Generator returned nothing.', true);
        return;
      }
      await navigator.clipboard.writeText(code);
      log.success('Generated and copied to clipboard', { format, filename, requestCount: requests.length });
      showExportResult(`Copied ${filename} to clipboard. Paste into your project.`);
    } catch (e) {
      log.error('Generation failed', e);
      showExportResult('Generation failed: ' + e.message, true);
    }
  });
});

log.debug('Popup opened');
loadState();
