'use strict';

const { readFileSync } = require('fs');
const path = require('path');
const worldCountries = require('world-countries');

/**
 * @type {string[]}
 */
const GOOGLE_DOMAINS = readFileSync(
  path.resolve(__dirname, './data/googleDomains.txt'),
  'utf8'
).split('\n');

const countryCodeToGoogleDomainMap = new Map();

GOOGLE_DOMAINS.forEach(domain => {
  const country = worldCountries.find(({ tld }) =>
    tld.some(t => domain.endsWith(t))
  );
  if (country) {
    countryCodeToGoogleDomainMap.set(country.cca2, domain);
  }
});

// create country code to top level domain map

/**
 * Returng Google localized domain for a given country (if exists) or '.google.com'
 * 
 * @param {string} countryCode - ISO 3166-1 alpha-2 country code like 'GB'
 * @returns {string} - Google domain with leading dot, like '.google.ae'
 */
function getByCountryCode(countryCode) {
  if (typeof countryCode === 'string') {
    const cc = countryCode.toUpperCase().substr(0, 2);
    if (countryCodeToGoogleDomainMap.has(cc))
      return countryCodeToGoogleDomainMap.get(cc);
  }
  return '.google.com';
}
exports.getByCountryCode = getByCountryCode;
