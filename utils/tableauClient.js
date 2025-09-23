const axios = require("axios");

// === ENV CONFIG ===
const TABLEAU_API_VERSION = process.env.TABLEAU_API_VERSION || "3.18";
const TABLEAU_SERVER_URL = process.env.TABLEAU_SERVER_URL;
const TABLEAU_PAT_NAME = process.env.TABLEAU_PERSONAL_ACCESS_TOKEN_NAME;
const TABLEAU_PAT_VALUE = process.env.TABLEAU_PERSONAL_ACCESS_TOKEN_VALUE;
const TABLEAU_SITE_ID = process.env.TABLEAU_SITE_ID;

/**
 * === Sign in to Tableau Server ===
 * Returns: { token, siteId }
 */
async function tableauSignIn() {
  if (!TABLEAU_SERVER_URL || !TABLEAU_PAT_NAME || !TABLEAU_PAT_VALUE || !TABLEAU_SITE_ID) {
    console.warn("[Tableau] Missing credentials. Using placeholder sign-in.");
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
      },
      { headers: { "Content-Type": "application/json" } }
    );

    return {
      token: data.credentials.token,
      siteId: data.credentials.site.id,
    };
  } catch (err) {
    console.error("[Tableau] Sign-In failed:", err.response?.data || err.message);
    return { token: "PLACEHOLDER_TOKEN", siteId: "PLACEHOLDER_SITE" };
  }
}

/**
 * === Fetch all Tableau Views (dashboards) ===
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

    // Tableau nests views under `views.view` in the API response
    return data?.views?.view || [];
  } catch (err) {
    console.error("[Tableau] Fetch views failed:", err.response?.data || err.message);
    return [];
  }
}

/**
 * === Fetch Tableau Data for a given idea ===
 * Attaches "idea" context to each view
 */
async function fetchTableauDataForIdea(idea) {
  const views = await fetchTableauViews();
  return views.map((v) => ({
    id: v.id,
    name: v.name,
    contentUrl: v.contentUrl,
    idea,
  }));
}

/**
 * === Placeholder: Fetch Data Cloud (e.g., Salesforce Data Cloud) ===
 */
async function fetchDataCloud() {
  // Replace with actual Data Cloud API integration
  return [
    { id: 1, name: "Sample Account", revenue: 120000 },
    { id: 2, name: "Sample Opportunity", value: 45000 },
  ];
}

/**
 * === Create a Dashboard ===
 */
async function createDashboard(payload) {
  console.log("[Tableau] Creating dashboard with payload:", payload);

  // TODO: Replace with Tableau API call for publishing dashboards
  return "DASHBOARD_PLACEHOLDER_ID";
}

/**
 * === Embed a Dashboard (Generate embed URL) ===
 */
async function embedDashboard(dashboardId) {
  if (!TABLEAU_SERVER_URL) {
    return `https://tableau.placeholder.com/embed/${dashboardId}`;
  }
  return `${TABLEAU_SERVER_URL}/trusted/${dashboardId}/views`;
}

module.exports = {
  fetchTableauDataForIdea,
  fetchDataCloud,
  createDashboard,
  embedDashboard,
};
