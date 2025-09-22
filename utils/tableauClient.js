const axios = require("axios");

const TABLEAU_API_VERSION = "3.18"; // Placeholder API version
const TABLEAU_SERVER_URL = process.env.TABLEAU_SERVER_URL;
const TABLEAU_PAT_NAME = process.env.TABLEAU_PERSONAL_ACCESS_TOKEN_NAME;
const TABLEAU_PAT_VALUE = process.env.TABLEAU_PERSONAL_ACCESS_TOKEN_VALUE;
const TABLEAU_SITE_ID = process.env.TABLEAU_SITE_ID;

/**
 * Sign in to Tableau Server using Personal Access Token
 */
async function tableauSignIn() {
  if (!TABLEAU_SERVER_URL || !TABLEAU_PAT_NAME || !TABLEAU_PAT_VALUE || !TABLEAU_SITE_ID) {
    console.warn("Tableau credentials not set. Using placeholder sign-in.");
    return { token: "PLACEHOLDER_TOKEN", siteId: "PLACEHOLDER_SITE" };
  }

  try {
    const { data } = await axios.post(
      `${TABLEAU_SERVER_URL}/api/${TABLEAU_API_VERSION}/auth/signin`,
      {
        credentials: {
          personalAccessTokenName: TABLEAU_PAT_NAME,
          personalAccessTokenSecret: TABLEAU_PAT_VALUE,
          site: { contentUrl: TABLEAU_SITE_ID },
        },
      }
    );
    return {
      token: data.credentials.token,
      siteId: data.credentials.site.id,
    };
  } catch (err) {
    console.error("Tableau Sign-In failed:", err.message);
    return { token: "PLACEHOLDER_TOKEN", siteId: "PLACEHOLDER_SITE" };
  }
}

/**
 * Fetch all views (dashboards) from Tableau
 */
async function fetchTableauViews() {
  const { token, siteId } = await tableauSignIn();

  if (token === "PLACEHOLDER_TOKEN") {
    return [
      { id: "1", name: "Sample View 1", contentUrl: "sample/view1" },
      { id: "2", name: "Sample View 2", contentUrl: "sample/view2" },
    ];
  }

  try {
    const { data } = await axios.get(
      `${TABLEAU_SERVER_URL}/api/${TABLEAU_API_VERSION}/sites/${siteId}/views`,
      { headers: { "X-Tableau-Auth": token } }
    );
    return data.views || [];
  } catch (err) {
    console.error("Failed to fetch Tableau views:", err.message);
    return [];
  }
}

/**
 * Fetch Tableau data for a given idea
 */
async function fetchTableauDataForIdea(idea) {
  const views = await fetchTableauViews();
  return views.map((v) => ({
    id: v.id,
    name: v.name,
    contentUrl: v.contentUrl,
    idea, // attach idea for context
  }));
}

/**
 * Placeholder: Fetch Data Cloud data
 */
async function fetchDataCloud() {
  return [
    { id: 1, name: "Sample Account", revenue: 120000 },
    { id: 2, name: "Sample Opportunity", value: 45000 },
  ];
}

/**
 * Placeholder: Create a dashboard
 */
async function createDashboard(payload) {
  console.log("Creating dashboard with payload:", payload);
  return "DASHBOARD_PLACEHOLDER_ID";
}

/**
 * Placeholder: Embed a dashboard
 */
async function embedDashboard(dashboardId) {
  return `https://tableau.placeholder.com/embed/${dashboardId}`;
}

module.exports = {
  fetchTableauDataForIdea,
  fetchDataCloud,
  createDashboard,
  embedDashboard,
};
