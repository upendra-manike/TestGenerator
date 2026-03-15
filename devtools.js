// Create a panel for TestGenerator in DevTools to capture network via HAR
chrome.devtools.panels.create(
  'TestGenerator',
  '',
  'panel.html',
  () => {}
);
