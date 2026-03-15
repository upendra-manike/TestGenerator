'use strict';

window.TestGeneratorPostman = function (requests) {
  const items = requests.map((r, i) => {
    const method = (r.method || 'GET').toUpperCase();
    const url = r.url || '';
    const parsed = parseUrl(url);
    const name = sanitizeName(`${method} ${parsed.path || url}`) || `Request ${i + 1}`;
    const item = {
      name,
      request: {
        method,
        header: headersToPostman(r.headers),
        url: parsed.raw ? { raw: url, host: parsed.host, path: parsed.path, query: parsed.query } : url,
      },
    };
    if (r.body) {
      try {
        JSON.parse(r.body);
        item.request.body = { mode: 'raw', raw: r.body };
      } catch (_) {
        item.request.body = { mode: 'raw', raw: r.body };
      }
    }
    return item;
  });
  const collection = {
    info: {
      name: 'TestGenerator Collection',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: items,
  };
  return JSON.stringify(collection, null, 2);
};

function parseUrl(url) {
  try {
    const u = new URL(url);
    const path = u.pathname + u.search;
    const query = Array.from(u.searchParams.entries()).map(([k, v]) => ({ key: k, value: v }));
    return { raw: url, host: u.origin ? [u.origin] : [], path: path.split('?')[0], query };
  } catch (_) {
    return { path: url };
  }
}

function headersToPostman(headers) {
  if (!headers || !Object.keys(headers).length) return [];
  return Object.entries(headers).map(([key, value]) => ({ key, value: String(value) }));
}

function sanitizeName(name) {
  return name.replace(/[^\w\s-]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 100) || 'Request';
}
