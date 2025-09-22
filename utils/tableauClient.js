const axios = require("axios");

const TABLEAU_API_VERSION = "3.18"; // Placeholder
const TABLEAU_SERVER_URL = process.env.TABLEAU_SERVER_URL;
const TABLEAU_PAT_NAME = process.env.TABLEAU_PERSONAL_ACCESS_TOKEN_NAME;
const TABLEAU_PAT_VALUE = process.env.TABLEAU_PERSONAL_ACCESS_TOKEN_VALUE;
const TABLEAU_SITE_ID = process.env.TABLEAU_SITE_ID;

/**
 * Sign in to Tableau Server using Personal Access Token
 */
async function tableauSignIn() {
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

    const token = data.credentials.token;
    const siteId = data.credentials.site.id;
    return { token, siteId };
  } catch (err) {
    console.error("Tableau Sign-In failed:", err.message);
    throw new Error("Failed to authenticate with Tableau");
  }
}

/**
 * Fetch all views (dashboards) from Tableau
 */
async function fetchTableauViews() {
  try {
    const { token, siteId } = await tableauSignIn();

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
 * Fetch Tableau data for an idea (placeholder)
 */
async function fetchTableauDataForIdea(idea) {
  const views = await fetchTableauViews();
  return views.map((v) => ({
    id: v.id,
    name: v.name,
    contentUrl: v.contentUrl,
    idea, // attach idea
  }));
}

/**
 * Placeholder function: Fetch Data Cloud data
 */
async function fetchDataCloud() {
  // TODO: Replace with real Data Cloud API call
  return [
    { id: 1, name: "Sample Account", revenue: 120000 },
    { id: 2, name: "Sample Opportunity", value: 45000 },
  ];
}

/**
 * Placeholder function: Create a dashboard
 */
async function createDashboard(payload) {
  // TODO: Replace with REST API / Metadata API call
  console.log("Creating dashboard with payload:", payload);
  return "DASHBOARD_PLACEHOLDER_ID";
}

/**
 * Placeholder function: Embed a dashboard
 */
async function embedDashboard(dashboardId) {
  // TODO: Replace with Embedding API call
  return `https://tableau.placeholder.com/embed/${dashboardId}`;
}

module.exports = {
  fetchTableauDataForIdea,
  fetchDataCloud,
  createDashboard,
  embedDashboard,
};
