#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const generatorsDir = path.join(__dirname, 'generators');

function loadGenerator(name, globalName) {
  const window = {};
  const code = fs.readFileSync(path.join(generatorsDir, name + '.js'), 'utf8');
  const fn = new Function('window', code + '; return window.' + globalName + ';');
  return fn(window);
}

const mockRequests = [
  {
    method: 'GET',
    url: 'https://api.example.com/users',
    headers: { Accept: 'application/json' },
    body: null,
    timestamp: 1000,
  },
  {
    method: 'POST',
    url: 'https://api.example.com/login',
    headers: { 'Content-Type': 'application/json' },
    body: '{"email":"a@b.com","password":"secret"}',
    timestamp: 2000,
  },
];

const emptyRequests = [];

let passed = 0;
let failed = 0;

function ok(condition, label) {
  if (condition) {
    passed++;
    console.log('  \x1b[32m✓\x1b[0m ' + label);
  } else {
    failed++;
    console.log('  \x1b[31m✗\x1b[0m ' + label);
  }
}

function assertIncludes(output, substring, label) {
  ok(output && output.includes(substring), label || `output contains "${substring.slice(0, 40)}..."`);
}

console.log('\n--- TestGenerator: testing generators ---\n');

// Playwright
try {
  const playwright = loadGenerator('playwright', 'TestGeneratorPlaywright');
  const out = playwright(mockRequests);
  ok(typeof out === 'string', 'Playwright: returns string');
  assertIncludes(out, 'Playwright API tests', 'Playwright: header');
  assertIncludes(out, "request.get(", 'Playwright: GET call');
  assertIncludes(out, "request.post(", 'Playwright: POST call');
  assertIncludes(out, 'api.example.com/users', 'Playwright: URL in output');
  assertIncludes(out, 'expect(response.ok())', 'Playwright: assertion');
  const emptyOut = playwright(emptyRequests);
  assertIncludes(emptyOut, 'test.describe', 'Playwright: empty requests still valid');
} catch (e) {
  failed++;
  console.log('  \x1b[31m✗\x1b[0m Playwright: ' + e.message);
}

// Cypress
try {
  const cypress = loadGenerator('cypress', 'TestGeneratorCypress');
  const out = cypress(mockRequests);
  ok(typeof out === 'string', 'Cypress: returns string');
  assertIncludes(out, 'Cypress API tests', 'Cypress: header');
  assertIncludes(out, "cy.request('get'", 'Cypress: GET call');
  assertIncludes(out, "cy.request('post'", 'Cypress: POST call');
  assertIncludes(out, 'api.example.com/users', 'Cypress: URL in output');
  assertIncludes(out, 'response.status', 'Cypress: assertion');
} catch (e) {
  failed++;
  console.log('  \x1b[31m✗\x1b[0m Cypress: ' + e.message);
}

// Postman
try {
  const postman = loadGenerator('postman', 'TestGeneratorPostman');
  const out = postman(mockRequests);
  ok(typeof out === 'string', 'Postman: returns string');
  let parsed;
  try {
    parsed = JSON.parse(out);
  } catch (_) {
    parsed = null;
  }
  ok(parsed && parsed.info && parsed.item, 'Postman: valid JSON collection');
  ok(Array.isArray(parsed.item) && parsed.item.length === 2, 'Postman: 2 items');
  assertIncludes(out, 'TestGenerator Collection', 'Postman: collection name');
  assertIncludes(out, 'GET', 'Postman: GET method');
  assertIncludes(out, 'POST', 'Postman: POST method');
} catch (e) {
  failed++;
  console.log('  \x1b[31m✗\x1b[0m Postman: ' + e.message);
}

// REST-assured
try {
  const restAssured = loadGenerator('rest-assured', 'TestGeneratorRestAssured');
  const out = restAssured(mockRequests);
  ok(typeof out === 'string', 'REST-assured: returns string');
  assertIncludes(out, 'REST-assured tests', 'REST-assured: header');
  assertIncludes(out, 'import org.junit.jupiter', 'REST-assured: JUnit import');
  assertIncludes(out, '.get(', 'REST-assured: GET call');
  assertIncludes(out, '.post(', 'REST-assured: POST call');
  assertIncludes(out, 'statusCode(anyOf', 'REST-assured: assertion');
  assertIncludes(out, 'public void', 'REST-assured: test method');
} catch (e) {
  failed++;
  console.log('  \x1b[31m✗\x1b[0m REST-assured: ' + e.message);
}

console.log('\n--- Result: ' + passed + ' passed, ' + failed + ' failed ---\n');
process.exit(failed > 0 ? 1 : 0);
