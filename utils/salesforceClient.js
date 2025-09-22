const jsforce = require("jsforce");

/**
 * Fetch Salesforce data for a given idea
 * - Connects to Salesforce using jsforce
 * - Searches Accounts and Opportunities by name
 * - Returns placeholder data if credentials are missing
 */
async function fetchSalesforceData(idea) {
  // Placeholder fallback
  if (
    !process.env.SALESFORCE_USERNAME ||
    !process.env.SALESFORCE_PASSWORD ||
    !process.env.SALESFORCE_TOKEN
  ) {
    console.log(`[Placeholder] Fetching Salesforce data for idea: ${idea}`);
    return {
      accounts: [
        { id: "001", name: "Test Account", industry: "Tech" },
        { id: "002", name: "Test Lead", status: "Open" },
      ],
      opportunities: [
        { id: "003", name: "Test Opportunity", stage: "Prospecting" },
      ],
    };
  }

  try {
    const conn = new jsforce.Connection({ loginUrl: "https://login.salesforce.com" });
    await conn.login(
      process.env.SALESFORCE_USERNAME,
      process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_TOKEN
    );

    const accounts = await conn
      .sobject("Account")
      .find({ Name: { $like: `%${idea}%` } })
      .limit(5);

    const opportunities = await conn
      .sobject("Opportunity")
      .find({ Name: { $like: `%${idea}%` } })
      .limit(5);

    return { accounts, opportunities };
  } catch (err) {
    console.error("Salesforce fetch failed:", err.message);
    // fallback to placeholder
    return {
      accounts: [{ id: "001", name: "Fallback Account", industry: "Tech" }],
      opportunities: [{ id: "002", name: "Fallback Opportunity", stage: "Prospecting" }],
    };
  }
}

/**
 * Placeholder for future Salesforce actions
 */
async function performSalesforceAction(actionPayload) {
  console.log("[Placeholder] Performing Salesforce action:", actionPayload);
  return { status: "SUCCESS_PLACEHOLDER" };
}

module.exports = { fetchSalesforceData, performSalesforceAction };
