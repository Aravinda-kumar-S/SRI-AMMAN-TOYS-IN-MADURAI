/**
 * InsForge Database SDK & Client Connector
 * Dynamically loads credentials from single .env environment file
 * without hardcoding credentials in source code.
 */
(function () {
  window.ENV = window.ENV || {};

  // Fetch and parse single .env file dynamically in client environment
  async function loadEnvConfig() {
    if (window.ENV.INSFORGE_URL && window.ENV.INSFORGE_ANON_KEY) {
      return window.ENV;
    }

    try {
      const response = await fetch('/.env');
      if (response.ok) {
        const content = await response.text();
        content.split('\n').forEach(line => {
          const trimmed = line.trim();
          if (trimmed && !trimmed.startsWith('#')) {
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx > 0) {
              const key = trimmed.slice(0, eqIdx).trim();
              const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
              window.ENV[key] = val;
            }
          }
        });
      }
    } catch (err) {
      // Fallback if fetch is restricted
    }
    return window.ENV;
  }

  // Self-initializing environment loader
  const envPromise = loadEnvConfig().then(env => {
    const url = env.INSFORGE_URL || env.VITE_INSFORGE_URL || '';
    const key = env.INSFORGE_ANON_KEY || env.VITE_INSFORGE_ANON_KEY || '';

    // Automatically update input fields on admin UI if present
    const urlInput = document.getElementById('insforgeUrl');
    const keyInput = document.getElementById('insforgeAnonKey');
    if (urlInput && url) urlInput.value = url;
    if (keyInput && key) keyInput.value = key;
  });

  window.insforgeDB = {
    async getConfig() {
      await envPromise;
      const env = window.ENV || {};
      return {
        baseUrl: env.INSFORGE_URL || env.VITE_INSFORGE_URL || document.getElementById('insforgeUrl')?.value || '',
        anonKey: env.INSFORGE_ANON_KEY || env.VITE_INSFORGE_ANON_KEY || document.getElementById('insforgeAnonKey')?.value || ''
      };
    },

    async getRecords(table, options = {}) {
      const config = await this.getConfig();
      const url = config.baseUrl;
      const key = config.anonKey;

      if (!url || !key) {
        throw new Error('InsForge database credentials not found. Please set INSFORGE_URL and INSFORGE_ANON_KEY in your .env file.');
      }

      const limitParam = options.limit ? `?limit=${options.limit}` : '';
      const response = await fetch(`${url}/api/database/records/${table}${limitParam}`, {
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`InsForge API returned HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    },

    async insertRecord(table, data) {
      const config = await this.getConfig();
      const url = config.baseUrl;
      const key = config.anonKey;

      if (!url || !key) {
        throw new Error('InsForge database credentials not found.');
      }

      const bodyData = Array.isArray(data) ? data : [data];
      const response = await fetch(`${url}/api/database/records/${table}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });

      if (!response.ok) {
        throw new Error(`InsForge API returned HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    },

    async deleteRecord(table, idCol, idVal) {
      const config = await this.getConfig();
      const url = config.baseUrl;
      const key = config.anonKey;

      if (!url || !key) {
        throw new Error('InsForge database credentials not found.');
      }

      const response = await fetch(`${url}/api/database/records/${table}?${idCol}=eq.${encodeURIComponent(idVal)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`InsForge API returned HTTP ${response.status}: ${response.statusText}`);
      }

      return true;
    },

    async updateRecord(table, idCol, idVal, data) {
      const config = await this.getConfig();
      const url = config.baseUrl;
      const key = config.anonKey;

      if (!url || !key) {
        throw new Error('InsForge database credentials not found.');
      }

      const response = await fetch(`${url}/api/database/records/${table}?${idCol}=eq.${encodeURIComponent(idVal)}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`InsForge API returned HTTP ${response.status}: ${response.statusText}`);
      }

      return true;
    }
  };
})();
