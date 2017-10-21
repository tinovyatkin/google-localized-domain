'use strict';

const fetch = require('@destinationstransfers/fetch');
const { createWriteStream } = require('fs');
const path = require('path');

/**
 * Downloads and stores official Google Domains list: https://www.google.com/supported_domains
 */

console.info(
  'Downloading Google from https://www.google.com/supported_domains...'
);

fetch('https://www.google.com/supported_domains')
  .then(res => {
    if (!res.ok) throw new Error(`Failed to connect to Google`);
    // creating writeStream
    const outputStream = createWriteStream(
      path.resolve(__dirname, '../data/googleDomains.txt')
    );
    res.body.pipe(outputStream);
  })
  .catch(console.error.bind(console));
