/* eslint-disable github/no-then */
'use strict';

const path = require('path');
const { createWriteStream, mkdirSync, existsSync, statSync } = require('fs');
const { get } = require('https');
const { promisify } = require('util');

get[promisify.custom] = function(options) {
  return new Promise((resolve, reject) => {
    get(options, resolve).once('error', reject);
  });
};

/** @type {(options: string | import('http').RequestOptions | URL) => Promise.<import('http').IncomingMessage>} */
const nativeRequest = promisify(get);

/**
 * Downloads and stores official Google Domains list: https://www.google.com/supported_domains
 */

const dir = path.resolve(__dirname, '../data/');
const file = path.join(dir, 'googleDomains.txt');

if (existsSync(file))
  console.warn('File %s already exists, not updating...', file);
else {
  console.info(
    'Downloading Google from https://www.google.com/supported_domains...',
  );
  nativeRequest('https://www.google.com/supported_domains')
    .then(res => {
      // creating writeStream
      mkdirSync(dir);
      res.pipe(createWriteStream(file));
      return new Promise((resolve, reject) => {
        res.once('close', resolve);
        res.once('error', reject);
      });
    })
    .then(() =>
      console.info(
        'Successfully downloaded Google Domains data, %d bytes',
        statSync(file).size,
      ),
    )
    .catch(err => console.error(err));
}
