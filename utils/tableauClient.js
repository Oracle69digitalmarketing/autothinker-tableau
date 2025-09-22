const axios = require("axios");

async function fetchTableauData(idea) {
  const authResponse = await axios.post(\`\${process.env.TABLEAU_SERVER_URL}/api/3.18/auth/signin\`, {
    credentials: {
      personalAccessTokenName: process.env.TABLEAU_PERSONAL_ACCESS_TOKEN_NAME,
      personalAccessTokenSecret: process.env.TABLEAU_PERSONAL_ACCESS_TOKEN_VALUE,
      site: { contentUrl: process.env.TABLEAU_SITE_ID }
    }
  });

  const token = authResponse.data.credentials.token;
  const siteId = authResponse.data.credentials.site.id;

  const response = await axios.get(\`\${process.env.TABLEAU_SERVER_URL}/api/3.18/sites/\${siteId}/views\`, {
    headers: { "X-Tableau-Auth": token }
  });

  return response.data.views || [];
}

module.exports = { fetchTableauData };

