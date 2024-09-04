(function () {
    window.__env = window.__env || {};
  
    window.__env.backend_url = 'http://localhost:8080/';
    /* BLAUTH */
    window.__env.blAuth_serverUrl = 'https://saas.test.auth.berger-levrault.com/auth';
    window.__env.blAuth_realm = 'saas';
    window.__env.blAuth_clientId = 'BL_EGF_EVOL_VAL';
    window.__env.enable_security = true;

    window.__env.avgf_microfront_remoteEntry = '/avgf-microfront/remoteEntry.js'
})(this);
