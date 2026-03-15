#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const sharp = require('sharp');

const dir = __dirname;
const svgPath = path.join(dir, 'icon.svg');
const outPath = path.join(dir, 'icon-128.png');

const svg = fs.readFileSync(svgPath);

sharp(Buffer.from(svg))
  .png()
  .resize(128, 128)
  .toFile(outPath)
  .then(() => console.log('Written:', outPath))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
