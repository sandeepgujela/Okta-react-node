const okta = require('@okta/okta-sdk-nodejs');

const client =  new okta.Client({
    orgUrl:'{https://{yourOktaDomain}', 
    token:'{yourApiToken}'
})

module.exports = client;
