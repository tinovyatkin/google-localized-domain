# google-localized-domain

Returns localized Google domain name (like google.co.uk) querying by country code (like GB), uses official Google domains list. Sync and superfast.

# Usage

```js
const googleLocalizedDomain = require('@destinationstransfers/google-localized-domain');
const britainDomain = googleLocalizedDomain.getByCountryCode('GB'); // => '.google.co.uk'
```
