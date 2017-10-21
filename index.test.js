'use strict';

const { getByCountryCode } = require('./');

describe('Localized Google domains functions', () => {
  test('getByCountryCode', () => {
    expect(getByCountryCode('GB')).toBe('.google.co.uk');
    // should understand wrong case country too
    expect(getByCountryCode('Ru')).toBe('.google.ru');
    // wrong country code
    expect(getByCountryCode('UK')).toBe('.google.com');
    expect(getByCountryCode(undefined)).toBe('.google.com');
  });
});
